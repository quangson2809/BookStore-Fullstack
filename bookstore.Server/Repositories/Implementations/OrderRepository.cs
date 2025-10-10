using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Entities;
using bookstore.Server.Data;
namespace bookstore.Server.Repositories.Implementations
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }
    }
}
