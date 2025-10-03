using Microsoft.AspNetCore.Http;
namespace bookstore.Server.SessionCookies
{
    public class SessionManager : ISessionManager
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SessionManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetCurrentUserId()
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
            return userid.Value;
        }

        public void SetCurrentUserID(int UserId)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.Session == null)
            {
                throw new Exception("Không có thông tin từ request");
            }
            httpContext.Session.SetInt32("UserId", UserId);
        }

        public void ClearSessionState()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.Session == null)
            {
                throw new Exception("HttpContext or Session is not available.");
            }
            httpContext.Session.Clear();
        }

    }
}
