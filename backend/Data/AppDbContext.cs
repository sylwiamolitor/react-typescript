using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TestEntity> Tests { get; set; }
    }

    public class TestEntity
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
