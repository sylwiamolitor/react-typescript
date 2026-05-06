using backend.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowed(_ => true);
    });
}); 
var projectRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../"));
var envPath = Path.Combine(projectRoot, ".env");
Env.Load(envPath);

var hostVar = Environment.GetEnvironmentVariable("DATABASE_HOST");
var portVar = Environment.GetEnvironmentVariable("DATABASE_PORT");
var dbVar = Environment.GetEnvironmentVariable("DATABASE_NAME");
var userVar = Environment.GetEnvironmentVariable("DATABASE_USERNAME");
var passVar = Environment.GetEnvironmentVariable("DATABASE_PASSWORD");

var connectionString = "";
if (!string.IsNullOrWhiteSpace(hostVar) &&
    !string.IsNullOrWhiteSpace(portVar) &&
    !string.IsNullOrWhiteSpace(dbVar) &&
    !string.IsNullOrWhiteSpace(userVar) &&
    !string.IsNullOrWhiteSpace(passVar))
{
    connectionString = $"Host={hostVar};Port={portVar};Database={dbVar};Username={userVar};Password={passVar}";
}
else
    throw new Exception("Set database credentials!");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    var maxRetries = 30;
    var delayMs = 1000;
    var retries = 0;
    var migrated = false;

    while (retries < maxRetries && !migrated)
    {
        try
        {
            logger.LogInformation("Attempting to apply EF Core migrations (attempt {Attempt}/{Max})", retries + 1, maxRetries);
            db.Database.Migrate();
            migrated = true;
            logger.LogInformation("Migrations applied successfully.");
        }
        catch (Exception ex)
        {
            retries++;
            logger.LogWarning(ex, "Failed to apply migrations on attempt {Attempt}/{Max}. Retrying in {Delay}ms", retries, maxRetries, delayMs);
            try
            {
                System.Threading.Thread.Sleep(delayMs);
            }
            catch (Exception ex2)
            {
                logger.Log(LogLevel.Error, ex2.Message);
            }
        }
    }

    if (!migrated)
    {
        logger.LogError("Could not apply migrations after {Max} attempts. Continuing without applying migrations.", maxRetries);
    }

    try
    {
        db.Database.EnsureCreated();
        if (!db.TodoItems.Any())
        {
            db.TodoItems.AddRange(new TodoItem { Title = "Welcome task", IsDone = false },
                                  new TodoItem { Title = "Sample completed", IsDone = true });
            db.SaveChanges();
            logger.LogInformation("Seeded initial TodoItems.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReact");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/api/test", async (AppDbContext db) =>
{
    var exists = await db.Database.CanConnectAsync();
    if (!exists) return Results.Problem("Cannot connect to database");

    var test = await db.Tests.FirstOrDefaultAsync();
    if (test is null)
    {
        test = new TestEntity { Message = "Hello from Postgres" };
        db.Tests.Add(test);
        await db.SaveChangesAsync();
    }

    return Results.Ok(new { message = test.Message });
});

app.Run();
