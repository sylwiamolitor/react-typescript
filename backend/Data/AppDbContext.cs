using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TestEntity> Tests { get; set; }
        public DbSet<TodoItem> TodoItems { get; set; }
    }

    public class TestEntity
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
    }

    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
