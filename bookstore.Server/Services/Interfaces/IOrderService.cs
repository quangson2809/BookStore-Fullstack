using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IOrderService
    {
        // Define order-related methods here
        Task<IEnumerable<OrderResponse>> GetAllAsync();
        Task<OrderResponse?> GetByIdAsync(int id);
        Task<OrderResponse> CreateAsync(CreateOrderRequest request);
        Task<bool> UpdateStatusAsync(int id, string newStatus);
        Task<bool> DeleteAsync(int id);
    }
}