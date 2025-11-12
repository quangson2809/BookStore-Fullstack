using bookstore.Server.Data;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Repositories.Implementations
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(BookStoreDbContext dbContext) : base(dbContext) { }
        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _table.OrderBy(ct => ct.CategoryId).ToListAsync();
        }
    }

}
