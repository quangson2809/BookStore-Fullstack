using bookstore.Server.Data;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace bookstore.Server.Repositories.Implementations
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }
        public async Task<IEnumerable<Order>> GetOrdersByUserId(int userId)
        {
            return await _table
                .Where(o => o.UserId == userId)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                    .ThenInclude(d => d.Book)
                .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _table
                .Include(o => o.User)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                    .ThenInclude(d => d.Book)
                .ToListAsync();
        }

        public async Task UpdateStatus(int orderId)
        {
            await _table
                .Where(o => o.OrderId == orderId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(o => o.OrdersStatus, "Done"));
        }

    }
}
