using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Repositories.Implementations
{
    public class ImageRepoeitory : GenericRepository<BookImage>, IImageRepository
    {
        public ImageRepoeitory(BookStoreDbContext dbContext) : base(dbContext)
        {
            
        }

        public async Task Delete(BookImage bookImage)
        {
            _table.Remove(bookImage);
        }
    }
}
