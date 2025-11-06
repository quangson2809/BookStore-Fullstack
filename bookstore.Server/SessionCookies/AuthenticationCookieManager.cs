using bookstore.Server.Services.implementations;
using bookstore.Server.Entities;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
namespace bookstore.Server.SessionCookies
{
    public class AuthenticationCookieManager 
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthenticationCookieManager(IHttpContextAccessor httpContextAccessor) { 
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task Set(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.FirstName+user.LastName),
                new Claim(ClaimTypes.Role, user.Role.RoleName)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await _httpContextAccessor.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                claimsPrincipal
                );

            var name = claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value ?? "null";
            var role = claimsPrincipal.FindFirst(ClaimTypes.Role)?.Value ?? "null";
            Console.WriteLine("===============================set cookie " + name + ":::" + role);

        }
        public async Task Get()
        {
            var user = _httpContextAccessor.HttpContext.User;
            if (user == null || !user.Identity.IsAuthenticated)
            {
                Console.WriteLine("User chưa xác thực");
                return ;
            }

            // Lấy tên user
            var userName = user.FindFirst(ClaimTypes.Name)?.Value ?? "Unknown";

            // Lấy role user
            var role = user.FindFirst(ClaimTypes.Role)?.Value ?? "No Role";

            var logMsg = $"User Name: {userName}, Role: {role}";

            Console.WriteLine("===============================Get cookie info: " + logMsg);

        }
        public async Task Clear()
        {
            await _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            Console.WriteLine("===============================clear cookie done!");
        }
    }
}
