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
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// cấu hình DBcontext với SQL server
var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<BookStoreDbContext>(options =>
    options.UseSqlServer(connectionString));

//Đăng ký sesionstate
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20);// hết hán sau 20 phút 
    options.Cookie.HttpOnly = true;// ngăn chặn truy cập cookie từ phía client
    options.Cookie.IsEssential = true;// đảm bảo cookie được gửi ngay cả khi người dùng chưa đồng ý với chính sách cookie
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    
});
//builder.Services.AddSession(options =>
//{
//    options.IdleTimeout = TimeSpan.FromMinutes(20);
//    options.Cookie.HttpOnly = true;
//    options.Cookie.IsEssential = true;
//    // THAY ĐỔI Ở ĐÂY
//    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Yêu cầu HTTPS
//    options.Cookie.SameSite = SameSiteMode.None; // Cho phép cross-origin
//});

//cookie authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "BookStoreAuthCookie";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.None;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(10);//expire time
        options.LoginPath = "/api/Auth/admin/login";
    }
     );
//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//    .AddCookie(options =>
//    {
//        options.Cookie.Name = "BookStoreAuthCookie";
//        options.Cookie.HttpOnly = true;
//        // THAY ĐỔI Ở ĐÂY
//        options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Yêu cầu HTTPS
//        options.Cookie.SameSite = SameSiteMode.None; // Cho phép cross-origin
//        options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
//        options.LoginPath = "/api/Auth/admin/login";
//    }
//     );

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
builder.Services.AddScoped<IImageRepository, ImageRepoeitory>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>(); 

// Đăng ký services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IFileService, LocalFileService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();


builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteClient", policy =>
    {
        policy.WithOrigins("https://localhost:5173", "https://localhost:58837")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseCors("AllowViteClient");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.UseHttpsRedirection();
app.Run();

