using bookstore.Server.Entities;

namespace bookstore.Server.Repositories.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersByUserId(int userId);
        Task UpdateStatus(int orderId);
    }
}
