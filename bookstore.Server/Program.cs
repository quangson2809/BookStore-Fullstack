using bookstore.Server.Data;
using bookstore.Server.Repositories;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services;
using bookstore.Server.Services.implementations;
using bookstore.Server.Services.Implementations;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.SessionCookies;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models; // ✅ thêm dòng này

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// ✅ Bật Swagger để test API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Bookstore API",
        Version = "v1",
        Description = "Swagger UI cho Bookstore.Server"
    });
});

// cấu hình DBcontext với SQL server
var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<BookStoreDbContext>(options =>
    options.UseSqlServer(connectionString));

//Đăng ký sesionstate
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.None;
    options.Cookie.SameSite = SameSiteMode.Lax;
});

//cookie authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "BookStoreAuthCookie";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.None;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
    });

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<SessionManager>();
builder.Services.AddScoped<AuthenticationCookieManager>();

// đăng ký Repositoryies
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartDetailRepository, CartDetailRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IImageRepoeitory, ImageRepoeitory>();

// Đăng ký services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IFileService, LocalFileService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteClient", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:58837")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseCors("AllowViteClient");

// ✅ Hiển thị Swagger khi chạy ở môi trường Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
