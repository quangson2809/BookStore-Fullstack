using Microsoft.AspNetCore.Http;
using bookstore.Server.Entities;
namespace bookstore.Server.SessionCookies
{
    public class SessionManager 
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SessionManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()

        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.Session == null)
            {
                throw new Exception("Không có thông tin từ request");
            }
            var userid = httpContext.Session.GetInt32("UserId");
            if (userid == null)
            {
                throw new Exception("người dùng chưa đăng nhập hoặc session hết hạn");
            }
            Console.WriteLine("============================GetUserId" + ":" + userid.Value);
            return userid.Value;
        }

        public async Task Set(User user)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.Session == null)
            {
                throw new Exception("Không có thông tin từ request");
            }
            httpContext.Session.SetInt32("UserId", user.UserId);
            Console.WriteLine("============================Set" + ":" + user.UserId);
        }

        public void Clear()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.Session == null)
            {
                throw new Exception("HttpContext or Session is not available.");
            }
            Console.WriteLine("============================Clear session");
            httpContext.Session.Clear();
        }

    }
}
