using Microsoft.AspNetCore.Authentication;
using Microsoft.Identity.Client;
using System.Security.Claims;

namespace bookstore.Server.SessionCookies
{
    public class AuthenticationCookie
    {
        IHttpContextAccessor _httpContextAccessor;
        public AuthenticationCookie(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task SetAuthenticationAsync(String Role)
        {
            var claims = new List<Claim>
            {
                new Claim (ClaimTypes.Role,Role)
            };
            var idetity = new ClaimsIdentity(claims, "Cookies");
            var principal = new ClaimsPrincipal(idetity);
            var _httpContext = _httpContextAccessor.HttpContext;

            if (_httpContext == null)
            {
                throw new Exception("Không có thông tin từ request");
            }

            await _httpContext.SignInAsync("Cookies", principal, new AuthenticationProperties
            {
                IsPersistent = true,// cookies tồn tại ngay cả khi trình duyệt đóng  browser cho đến khi hết hạn
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(20)
            });
        }
    }
}
