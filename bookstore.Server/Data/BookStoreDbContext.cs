using System;
using System.Collections.Generic;
using bookstore.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Data;

public partial class BookStoreDbContext : DbContext
{
    public BookStoreDbContext()
    {
    }

    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options)
        : base(options)
    {
    }
    

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookImage> BookImages { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<CartDetail> CartDetails { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrdersDetail> OrdersDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Publisher> Publishers { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.AuthorId).HasName("PK__Author__55B9F6BF32DFCA59");

            entity.ToTable("Author");

            entity.Property(e => e.AuthorId).HasColumnName("Author_Id");
            entity.Property(e => e.AuthorName)
                .HasMaxLength(150)
                .HasColumnName("Author_Name");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.BookId).HasName("PK__Book__C223F3B46EA5BBAF");

            entity.ToTable("Book");

            entity.HasIndex(e => e.Isbn, "UQ__Book__447D36EA3043CB21").IsUnique();

            entity.Property(e => e.BookId).HasColumnName("Book_Id");
            entity.Property(e => e.AuthorId).HasColumnName("Author_Id");
            entity.Property(e => e.BookName)
                .HasMaxLength(200)
                .HasColumnName("Book_Name");
            entity.Property(e => e.BookStatus)
                .HasMaxLength(50)
                .HasColumnName("Book_Status");
            entity.Property(e => e.CategoryId).HasColumnName("Category_Id");
            entity.Property(e => e.Isbn)
                .HasMaxLength(20)
                .HasColumnName("ISBN");
            entity.Property(e => e.OriginalPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("Original_price");
            entity.Property(e => e.PageNumber).HasColumnName("Page_number");
            entity.Property(e => e.PublishTime).HasColumnName("Publish_Time");
            entity.Property(e => e.PublisherId).HasColumnName("Publisher_Id");
            entity.Property(e => e.SalePrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("Sale_price");
            entity.Property(e => e.StockQuantity)
                .HasDefaultValue(0)
                .HasColumnName("Stock_Quantity");

            entity.HasOne(d => d.Author).WithMany(p => p.Books)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("FK__Book__Author_Id__300424B4");

            entity.HasOne(d => d.Category).WithMany(p => p.Books)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Book__Category_I__2E1BDC42");

            entity.HasOne(d => d.Publisher).WithMany(p => p.Books)
                .HasForeignKey(d => d.PublisherId)
                .HasConstraintName("FK__Book__Publisher___2F10007B");
        });

        modelBuilder.Entity<BookImage>(entity =>
        {
            entity.HasKey(e => e.BookImageId).HasName("PK__BookImag__DE81FC42DDC26973");

            entity.ToTable("BookImage");

            entity.Property(e => e.BookImageId).HasColumnName("BookImage_Id");
            entity.Property(e => e.BookId).HasColumnName("Book_Id");
            entity.Property(e => e.BookImageUrl)
                .HasMaxLength(300)
                .HasColumnName("BookImage_Url");
            entity.Property(e => e.IsMain)
                .HasDefaultValue(false)
                .HasColumnName("Is_Main");

            entity.HasOne(d => d.Book).WithMany(p => p.BookImages)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__BookImage__Book___33D4B598");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__Cart__D6AB4759A50C15EB");

            entity.ToTable("Cart");

            entity.Property(e => e.CartId).HasColumnName("Cart_Id");
            entity.Property(e => e.UserId).HasColumnName("User_Id");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Cart__User_Id__3E52440B");
        });

        modelBuilder.Entity<CartDetail>(entity =>
        {
            entity.HasKey(e => new { e.CartId, e.BookId }).HasName("PK__CartDeta__8A8978626C5FBE62");

            entity.ToTable("CartDetail");

            entity.Property(e => e.CartId).HasColumnName("Cart_Id");
            entity.Property(e => e.BookId).HasColumnName("Book_Id");
            entity.Property(e => e.TotalAmount)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("Total_amount");

            entity.HasOne(d => d.Book).WithMany(p => p.CartDetails)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CartDetai__Book___4222D4EF");

            entity.HasOne(d => d.Cart).WithMany(p => p.CartDetails)
                .HasForeignKey(d => d.CartId)
                .HasConstraintName("FK__CartDetai__Cart___412EB0B6");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__6DB38D6EB3C9006C");

            entity.ToTable("Category");

            entity.HasIndex(e => e.CategoryName, "UQ__Category__B35EB4194053120E").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("Category_Id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .HasColumnName("Category_Name");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrdersId).HasName("PK__Orders__B2D3008CD2772431");

            entity.Property(e => e.OrdersId).HasColumnName("Orders_Id");
            entity.Property(e => e.OrdersStatus)
                .HasMaxLength(50)
                .HasColumnName("Orders_Status");
            entity.Property(e => e.PaymentId).HasColumnName("Payment_Id");
            entity.Property(e => e.UserId).HasColumnName("User_Id");

            entity.HasOne(d => d.Payment).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK__Orders__Payment___47DBAE45");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Orders__User_Id__46E78A0C");
        });

        modelBuilder.Entity<OrdersDetail>(entity =>
        {
            entity.HasKey(e => new { e.OrderId, e.BookId }).HasName("PK__OrdersDe__ADC65F40144899D0");

            entity.ToTable("OrdersDetail");

            entity.Property(e => e.OrderId).HasColumnName("Order_Id");
            entity.Property(e => e.BookId).HasColumnName("Book_Id");
            entity.Property(e => e.CreateTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Create_Time");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("Total_Price");

            entity.HasOne(d => d.Book).WithMany(p => p.OrdersDetails)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrdersDet__Book___4CA06362");

            entity.HasOne(d => d.Order).WithMany(p => p.OrdersDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrdersDet__Order__4BAC3F29");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__DA6C7FC190B29D8E");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasColumnName("Payment_Id");
            entity.Property(e => e.MethodName)
                .HasMaxLength(100)
                .HasColumnName("Method_Name");
        });

        modelBuilder.Entity<Publisher>(entity =>
        {
            entity.HasKey(e => e.PublisherId).HasName("PK__Publishe__F9F45A44F669CACA");

            entity.ToTable("Publisher");

            entity.HasIndex(e => e.PublisherName, "UQ__Publishe__D198AC377E8A0869").IsUnique();

            entity.Property(e => e.PublisherId).HasColumnName("Publisher_Id");
            entity.Property(e => e.PublisherName)
                .HasMaxLength(150)
                .HasColumnName("Publisher_Name");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__D80AB4BBE82D9110");

            entity.ToTable("Role");

            entity.HasIndex(e => e.RoleName, "UQ__Role__035DB7493D236212").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("Role_Id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("Role_Name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__206D917012DBFEDC");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UQ__User__A9D105345894DF28").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("User_Id");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.CreateTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Create_Time");
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("Last_Name");
            entity.Property(e => e.PasswordHash).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.RoleId).HasColumnName("Role_Id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__User__Role_Id__3B75D760");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
