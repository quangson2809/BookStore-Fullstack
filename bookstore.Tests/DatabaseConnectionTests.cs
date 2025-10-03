using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Threading.Tasks;
using bookstore.Server.Database;              // DbContext của bạn
using Microsoft.EntityFrameworkCore;          // DbContextOptionsBuilder
using Microsoft.Extensions.Configuration;     // ConfigurationBuilder
using Xunit;

namespace bookstore.Tests
{
    public class DatabaseConnectionTests
    {
        private readonly string _connectionString;

        public DatabaseConnectionTests()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory() + "/../../../../bookstore.Server")
                .AddJsonFile("appsettings.json")
                .Build();


            //Lấy connection string ra từ appsettings.json
            _connectionString = configuration.GetConnectionString("DatabaseConnection");
        }

        //[Fact]
        public async Task TestDbConnection()
        {
            var optionsbuider = new DbContextOptionsBuilder<BookStoreDbContext>()
                .UseSqlServer(_connectionString)
                .Options;

            using var context = new BookStoreDbContext(optionsbuider);

            var canConnect = await context.Database.CanConnectAsync();

            Assert.True(canConnect, "Không thể kết nối đến cơ sở dữ liệu." + _connectionString + "_+_+_+_+_+_+_+_");
        }
    }
}
