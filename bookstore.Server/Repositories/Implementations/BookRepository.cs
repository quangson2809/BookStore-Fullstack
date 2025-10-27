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

        public async Task Create(Book book)
        {
            await _table.AddAsync(book);
             _dbContext.SaveChanges();
        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
             return await _table
                .Include(book => book.BookImages)
                .ToListAsync();
            
        }

        public async Task<Book> GetByIdAsync(int bookId)
        {
            return await _table
                .Include(book => book.BookImages)
                .Include(book => book.Category)
                .FirstOrDefaultAsync(b => b.BookId == bookId);
        }

        public async Task UpdateAsync(Book book)
        {
            await _table
                .Where(b => b.BookId == book.BookId)
                .ExecuteUpdateAsync(b => b
                    .SetProperty(bk => bk.BookName, book.BookName)
                    .SetProperty(bk => bk.Isbn, book.Isbn)
                    .SetProperty(bk => bk.Author, book.Author)
                    .SetProperty(bk => bk.Publisher, book.Publisher)
                    .SetProperty(bk => bk.StockQuantity, book.StockQuantity)
                    .SetProperty(bk => bk.SalePrice, book.SalePrice)
                    .SetProperty(bk => bk.OriginalPrice, book.OriginalPrice)
                    .SetProperty(bk => bk.PageNumber, book.PageNumber)
                    .SetProperty(bk => bk.PublishTime, book.PublishTime)
                    .SetProperty(bk => bk.CategoryId, book.CategoryId)
                    .SetProperty(bk => bk.Language, book.Language)
                    .SetProperty(bk => bk.BookImages, book.BookImages)
                );
        }
    }
}
