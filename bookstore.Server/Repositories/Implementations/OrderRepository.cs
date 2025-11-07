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
        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _dbContext.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                    .ThenInclude(d => d.Book)
                .ToListAsync();
        }

        public async Task<Order?> GetOrderWithDetailsAsync(int orderId)
        {
            return await _dbContext.Orders
                .Include(o => o.User)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                    .ThenInclude(d => d.Book)
                .FirstOrDefaultAsync(o => o.OrdersId == orderId);
        }
        public async Task ExecuteSqlRawAsync(string sql)
        {
            await _dbContext.Database.ExecuteSqlRawAsync(sql);
        }
        public async Task<bool> DeleteOrderAndDetailsAsync(int orderId)
        {
            // Xóa chi tiết đơn hàng trước
            var sqlDeleteDetails = $"DELETE FROM OrdersDetail WHERE Order_Id = {orderId}";
            await _dbContext.Database.ExecuteSqlRawAsync(sqlDeleteDetails);

            // Sau đó xóa đơn hàng chính
            var sqlDeleteOrder = $"DELETE FROM Orders WHERE Orders_Id = {orderId}";
            await _dbContext.Database.ExecuteSqlRawAsync(sqlDeleteOrder);

            return true;
        }

    }
}
