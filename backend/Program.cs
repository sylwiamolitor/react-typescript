using backend.Data;
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
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? Environment.GetEnvironmentVariable("DATABASE_URL_2");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        if (db.Database.CanConnect())
        {
            db.Database.EnsureCreated();
        }
        else
        {
            logger.LogWarning("Database is not reachable at startup. Host may be unavailable. Skipping EnsureCreated.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while initializing the database at startup. Continuing without DB initialization.");
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
