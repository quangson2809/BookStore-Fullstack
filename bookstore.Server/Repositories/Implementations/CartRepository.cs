using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Data;

namespace bookstore.Server.Repositories.Implementations
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        public CartRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }
    }
}
