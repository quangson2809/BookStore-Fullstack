using bookstore.Server.Data;
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
            var user = await _table.Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.FirstName == firstName);
            if (user == null) return null;
            return user;
        }

        public async Task<User?> GetByPhone(string phone)
        {
            var user = await _table.Include(u => u.Role)
               .FirstOrDefaultAsync(u => u.Phone == phone);
            if (user == null) return null;
            return user;
        }

        public async Task AddAsync(User user)
        {
            await _table.AddAsync(user);
        }
    }
}
