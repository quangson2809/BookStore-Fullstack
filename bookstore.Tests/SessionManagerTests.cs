using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using bookstore.Server.SessionCookies;
using Microsoft.AspNetCore.Http;
using Moq;
namespace bookstore.Tests
{
    using bookstore.Server.Entities;
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    public class FakeSession : ISession
    {
        private readonly Dictionary<string, byte[]> _store = new();

        public bool IsAvailable => true;
        public string Id { get; } = Guid.NewGuid().ToString();
        public IEnumerable<string> Keys => _store.Keys;

        public void Clear() => _store.Clear();

        public Task CommitAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task LoadAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;

        public void Remove(string key) => _store.Remove(key);

        public void Set(string key, byte[] value) => _store[key] = value;

        public bool TryGetValue(string key, out byte[] value) => _store.TryGetValue(key, out value);
    }

    public class SessionManagerTests
    {
        
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
