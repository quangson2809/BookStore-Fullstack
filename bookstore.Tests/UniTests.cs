using bookstore.Server.SessionCookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using bookstore.Server;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace bookstore.Tests
{
    public class UniTests : IClassFixture<WebApplicationFactory<bookstore.Server.Program>>
    {
        private readonly HttpClient _client;

        public UniTests(WebApplicationFactory<bookstore.Server.Program> factory)
        {
            _client = factory.CreateClient();
        }
       
        // Test Session
        [Fact]
        public void runTest()
        {
            var context = new DefaultHttpContext();
            context.Session = new FakeSession();

            context.Session.SetInt32("UserId", 1234);
            var accessor = new HttpContextAccessor { HttpContext = context };

            SessionManager sessionManager = new SessionManager(accessor);
            var retrievedUserId = sessionManager.GetCurrentUserId();
            Console.ForegroundColor = ConsoleColor.DarkBlue;
            Console.WriteLine("============================UserId" + ":" + retrievedUserId);
        }
    }
}
