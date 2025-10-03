using bookstore.Server.Database;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Implementations
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }
    }
}
