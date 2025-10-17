using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;          // DbContextOptionsBuilder
using Microsoft.Extensions.Configuration;     // ConfigurationBuilder
using Xunit;
using bookstore.Server.Data;

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
            Console.WriteLine("====================Kết nối đến cơ sở dữ liệu thành công.");
        }
    }
}
