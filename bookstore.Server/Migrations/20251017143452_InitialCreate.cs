using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bookstore.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Author",
                columns: table => new
                {
                    Author_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Author_Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Author__55B9F6BF32DFCA59", x => x.Author_Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Category_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__6DB38D6EB3C9006C", x => x.Category_Id);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    Payment_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Method_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Payment__DA6C7FC190B29D8E", x => x.Payment_Id);
                });

            migrationBuilder.CreateTable(
                name: "Publisher",
                columns: table => new
                {
                    Publisher_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Publisher_Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Publishe__F9F45A44F669CACA", x => x.Publisher_Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Role_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Role__D80AB4BBE82D9110", x => x.Role_Id);
                });

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    Book_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Book_Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Original_price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Sale_price = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Book_Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Publish_Time = table.Column<DateOnly>(type: "date", nullable: true),
                    Stock_Quantity = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    ISBN = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Language = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Page_number = table.Column<int>(type: "int", nullable: true),
                    Category_Id = table.Column<int>(type: "int", nullable: true),
                    Publisher_Id = table.Column<int>(type: "int", nullable: true),
                    Author_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Book__C223F3B46EA5BBAF", x => x.Book_Id);
                    table.ForeignKey(
                        name: "FK__Book__Author_Id__300424B4",
                        column: x => x.Author_Id,
                        principalTable: "Author",
                        principalColumn: "Author_Id");
                    table.ForeignKey(
                        name: "FK__Book__Category_I__2E1BDC42",
                        column: x => x.Category_Id,
                        principalTable: "Category",
                        principalColumn: "Category_Id");
                    table.ForeignKey(
                        name: "FK__Book__Publisher___2F10007B",
                        column: x => x.Publisher_Id,
                        principalTable: "Publisher",
                        principalColumn: "Publisher_Id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    User_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    First_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Last_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Create_Time = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Role_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User__206D917012DBFEDC", x => x.User_Id);
                    table.ForeignKey(
                        name: "FK__User__Role_Id__3B75D760",
                        column: x => x.Role_Id,
                        principalTable: "Role",
                        principalColumn: "Role_Id");
                });

            migrationBuilder.CreateTable(
                name: "BookImage",
                columns: table => new
                {
                    BookImage_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookImage_Url = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Is_Main = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    Book_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__BookImag__DE81FC42DDC26973", x => x.BookImage_Id);
                    table.ForeignKey(
                        name: "FK__BookImage__Book___33D4B598",
                        column: x => x.Book_Id,
                        principalTable: "Book",
                        principalColumn: "Book_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    Cart_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Cart__D6AB4759A50C15EB", x => x.Cart_Id);
                    table.ForeignKey(
                        name: "FK__Cart__User_Id__3E52440B",
                        column: x => x.User_Id,
                        principalTable: "User",
                        principalColumn: "User_Id");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Orders_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Orders_Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    User_Id = table.Column<int>(type: "int", nullable: true),
                    Payment_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Orders__B2D3008CD2772431", x => x.Orders_Id);
                    table.ForeignKey(
                        name: "FK__Orders__Payment___47DBAE45",
                        column: x => x.Payment_Id,
                        principalTable: "Payment",
                        principalColumn: "Payment_Id");
                    table.ForeignKey(
                        name: "FK__Orders__User_Id__46E78A0C",
                        column: x => x.User_Id,
                        principalTable: "User",
                        principalColumn: "User_Id");
                });

            migrationBuilder.CreateTable(
                name: "CartDetail",
                columns: table => new
                {
                    Cart_Id = table.Column<int>(type: "int", nullable: false),
                    Book_Id = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Total_amount = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CartDeta__8A8978626C5FBE62", x => new { x.Cart_Id, x.Book_Id });
                    table.ForeignKey(
                        name: "FK__CartDetai__Book___4222D4EF",
                        column: x => x.Book_Id,
                        principalTable: "Book",
                        principalColumn: "Book_Id");
                    table.ForeignKey(
                        name: "FK__CartDetai__Cart___412EB0B6",
                        column: x => x.Cart_Id,
                        principalTable: "Cart",
                        principalColumn: "Cart_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdersDetail",
                columns: table => new
                {
                    Order_Id = table.Column<int>(type: "int", nullable: false),
                    Book_Id = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Total_Price = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Create_Time = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrdersDe__ADC65F40144899D0", x => new { x.Order_Id, x.Book_Id });
                    table.ForeignKey(
                        name: "FK__OrdersDet__Book___4CA06362",
                        column: x => x.Book_Id,
                        principalTable: "Book",
                        principalColumn: "Book_Id");
                    table.ForeignKey(
                        name: "FK__OrdersDet__Order__4BAC3F29",
                        column: x => x.Order_Id,
                        principalTable: "Orders",
                        principalColumn: "Orders_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Book_Author_Id",
                table: "Book",
                column: "Author_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Book_Category_Id",
                table: "Book",
                column: "Category_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Book_Publisher_Id",
                table: "Book",
                column: "Publisher_Id");

            migrationBuilder.CreateIndex(
                name: "UQ__Book__447D36EA3043CB21",
                table: "Book",
                column: "ISBN",
                unique: true,
                filter: "[ISBN] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_BookImage_Book_Id",
                table: "BookImage",
                column: "Book_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_User_Id",
                table: "Cart",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_CartDetail_Book_Id",
                table: "CartDetail",
                column: "Book_Id");

            migrationBuilder.CreateIndex(
                name: "UQ__Category__B35EB4194053120E",
                table: "Category",
                column: "Category_Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Payment_Id",
                table: "Orders",
                column: "Payment_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_User_Id",
                table: "Orders",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrdersDetail_Book_Id",
                table: "OrdersDetail",
                column: "Book_Id");

            migrationBuilder.CreateIndex(
                name: "UQ__Publishe__D198AC377E8A0869",
                table: "Publisher",
                column: "Publisher_Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Role__035DB7493D236212",
                table: "Role",
                column: "Role_Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Role_Id",
                table: "User",
                column: "Role_Id");

            migrationBuilder.CreateIndex(
                name: "UQ__User__A9D105345894DF28",
                table: "User",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookImage");

            migrationBuilder.DropTable(
                name: "CartDetail");

            migrationBuilder.DropTable(
                name: "OrdersDetail");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Author");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Publisher");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
