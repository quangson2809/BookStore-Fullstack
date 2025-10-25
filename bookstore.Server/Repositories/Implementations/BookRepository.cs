using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Entities;
using bookstore.Server.Data;
using Microsoft.EntityFrameworkCore;
namespace bookstore.Server.Repositories.Implementations
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
             return await _table
                .Include(book => book.BookImages)
                .ToListAsync();
            
        }

    }
}
