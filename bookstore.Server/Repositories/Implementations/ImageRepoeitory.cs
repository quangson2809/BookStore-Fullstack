using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Data;
namespace bookstore.Server.Repositories.Implementations
{
    public class ImageRepoeitory : GenericRepository<BookImage>, IImageRepoeitory
    {
        public ImageRepoeitory(BookStoreDbContext dbContext) : base(dbContext)
        {

        }
    }
}
