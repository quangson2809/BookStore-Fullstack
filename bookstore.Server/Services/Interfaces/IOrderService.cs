using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IOrderService
    {
        // Define order-related methods here
        Task<IEnumerable<OrdersOverviewDashBoardResponse>> GetAll();
        Task<OrderResponse?> GetByOrderId(int OrderId);
        Task<IEnumerable<OrderResponse>> GetByUserId(int UserId);
        Task<StatusResponse> CreateAsync(int CartId, OrderCreateRequest Request);
        Task<StatusResponse> UpdateStatusAsync(int OrderId);
    }
}