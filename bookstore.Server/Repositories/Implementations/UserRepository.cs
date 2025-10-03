using bookstore.Server.Database;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace bookstore.Server.Repositories.Implementations
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(BookStoreDbContext dbContext) : base(dbContext)
        { }

        public async Task<User?> GetByFirstName(string firstName)
        {
            var user = await _table.FirstOrDefaultAsync(u => u.FirstName == firstName);
            if (user == null) return null;
            return user;
        }
    }
}
