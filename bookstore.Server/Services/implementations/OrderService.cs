using bookstore.Server.Data;
using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Entities;
using bookstore.Server.Repositories;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Services.implementations
{
    public class OrderService : IOrderService
    {
        // Implement invoice-related methods here
        private readonly IOrderRepository _orderRepository;
        private readonly IGenericRepository<OrdersDetail> _orderDetailRepo;
        public OrderService(
            IOrderRepository orderRepository,
            IGenericRepository<OrdersDetail> orderDetailRepo)
        {
            _orderRepository = orderRepository;
            _orderDetailRepo = orderDetailRepo;
        }
        //Lấy tat cả đơn hàng
        public async Task<IEnumerable<OrderResponse>> GetAllAsync()
        {
            var orders = await _orderRepository.GetAllAsync();

            return orders.Select(o => new OrderResponse
            {
                OrdersId = o.OrdersId,
                OrdersStatus = o.OrdersStatus,
                UserName = o.User != null ? $"{o.User.FirstName}{o.User.LastName}".Trim() : null,
                PaymentMethod = o.Payment?.MethodName,
                CreateTime = o.CreateTime,
                OrderDetails = o.OrdersDetails.Select(d => new OrderDetailResponse
                {
                    BookId = d.BookId,
                    BookTitle = d.Book?.BookName,
                    Quantity = d.Quantity,
                    TotalPrice = d.TotalPrice
                }).ToList()
            });
        }

        // Lấy đơn hàng theo ID
        public async Task<OrderResponse?> GetByIdAsync(int id)
        {
            var o = await _orderRepository.GetOrderWithDetailsAsync(id);
            if (o == null) return null;

            return new OrderResponse
            {
                OrdersId = o.OrdersId,
                OrdersStatus = o.OrdersStatus,
                UserName = o.User != null ? $"{o.User.FirstName}{o.User.LastName}".Trim() : null,
                PaymentMethod = o.Payment?.MethodName,
                CreateTime = o.CreateTime,
                OrderDetails = o.OrdersDetails.Select(d => new OrderDetailResponse
                {
                    BookId = d.BookId,
                    BookTitle = d.Book?.BookName,
                    Quantity = d.Quantity,
                    TotalPrice = d.TotalPrice
                }).ToList()
            };
        }

        // Tạo đơn hàng mới
        public async Task<OrderResponse> CreateAsync(CreateOrderRequest request)
        {
            var order = new Order
            {
                UserId = request.UserId,
                PaymentId = request.PaymentId,
                OrdersStatus = "Pending",
                CreateTime = DateTime.Now
            };

            await _orderRepository.AddAsync(order);
            await _orderRepository.SaveChangesAsync();

            foreach (var detail in request.OrderDetails)
            {
                var od = new OrdersDetail
                {
                    OrderId = order.OrdersId,
                    BookId = detail.BookId,
                    Quantity = detail.Quantity,
                    TotalPrice = detail.TotalPrice,
                    CreateTime = DateTime.Now
                };
                await _orderDetailRepo.AddAsync(od);
            }
            await _orderDetailRepo.SaveChangesAsync();

            return await GetByIdAsync(order.OrdersId) ?? new OrderResponse();
        }

        // Cập nhật trạng thái
        public async Task<bool> UpdateStatusAsync(int id, string newStatus)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null) return false;

            order.OrdersStatus = newStatus;
            await _orderRepository.UpdateAsync(order);
            await _orderRepository.SaveChangesAsync();
            return true;
        }

        // Xóa đơn hàng
        public async Task<bool> DeleteAsync(int id)
        {
            var order = await _orderRepository.GetOrderWithDetailsAsync(id);
            if (order == null) return false;

            foreach (var d in order.OrdersDetails)
                await _orderDetailRepo.DeleteAsync(d.OrderId);

            await _orderRepository.DeleteAsync(id);
            await _orderRepository.SaveChangesAsync();
            return true;
        }
    }
}