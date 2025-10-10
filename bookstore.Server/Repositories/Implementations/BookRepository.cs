using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Entities;
using bookstore.Server.Data;
namespace bookstore.Server.Repositories.Implementations
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }
    }
}
