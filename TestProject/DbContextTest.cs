using System.IO;
using System.Threading.Tasks;
using bookstore.Server.Database;              // DbContext của bạn
using Microsoft.EntityFrameworkCore;          // DbContextOptionsBuilder
using Microsoft.Extensions.Configuration;     // ConfigurationBuilder
using Xunit;

namespace TestProject
{
    public class DbContextTest
    {
        private readonly string _connectionString;

        public DbContextTest()
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json") // Sửa tên file bị sai
                .Build();

            _connectionString = configuration.GetConnectionString("DatabaseConnection");
        }

        [Fact]
        public async Task Should_Connect_To_Database()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<BookStoreDbContext>()
                .UseSqlServer(_connectionString)
                .Options;
            using var context = new BookStoreDbContext(options);
            // Act
            var canConnect = await context.Database.CanConnectAsync();
            // Assert
            Assert.True(canConnect, "Không thể kết nối tới Database. Kiểm tra lại ConnectionString hoặc SQL Server.");
        }
    }
}
