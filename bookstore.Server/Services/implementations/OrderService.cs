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
        private readonly BookStoreDbContext _context;
        public OrderService(BookStoreDbContext context)
        {
            _context = context;
        }
        //Lấy tat cả đơn hàng
        public async Task<IEnumerable<OrderResponse>> GetAllAsync()
        {
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                    .ThenInclude(d => d.Book)
                .Select(o => new OrderResponse
                {
                    OrdersId = o.OrdersId,
                    OrdersStatus = o.OrdersStatus,
                    UserName = o.User != null ? $"{o.User.FirstName}{o.User.LastName}".Trim() : null,
                    PaymentMethod = o.Payment != null ? o.Payment.MethodName : null,
                    CreateTime = o.CreateTime,
                    OrderDetails = o.OrdersDetails.Select(d => new OrderDetailResponse
                    {
                        BookId = d.BookId,
                        BookTitle = d.Book.BookName,
                        Quantity = d.Quantity,
                        TotalPrice = d.TotalPrice
                    }).ToList()
                })
                .ToListAsync();
        }

        // Lấy đơn hàng theo ID
        public async Task<OrderResponse?> GetByIdAsync(int id)
        {
            var o = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                    .ThenInclude(d => d.Book)
                .FirstOrDefaultAsync(o => o.OrdersId == id);

            if (o == null) return null;

            return new OrderResponse
            {
                OrdersId = o.OrdersId,
                OrdersStatus = o.OrdersStatus,
                UserName = o.User != null?$"{o.User.FirstName}{o.User.LastName}".Trim() :null,
                PaymentMethod = o.Payment?.MethodName,
                CreateTime = o.CreateTime,
                OrderDetails = o.OrdersDetails.Select(d => new OrderDetailResponse
                {
                    BookId = d.BookId,
                    BookTitle = d.Book.BookName,
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

            _context.Orders.Add(order);
            await _context.SaveChangesAsync(); // lưu để có OrdersId

            foreach (var detail in request.OrderDetails)
            {
                var orderDetail = new OrdersDetail
                {
                    OrderId = order.OrdersId,
                    BookId = detail.BookId,
                    Quantity = detail.Quantity,
                    TotalPrice = detail.TotalPrice,
                    CreateTime = DateTime.Now
                };
                _context.OrdersDetails.Add(orderDetail);
            }

            await _context.SaveChangesAsync();

            return await GetByIdAsync(order.OrdersId) ?? new OrderResponse();
        }

        // Cập nhật trạng thái
        public async Task<bool> UpdateStatusAsync(int id, string newStatus)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            order.OrdersStatus = newStatus;
            await _context.SaveChangesAsync();
            return true;
        }

        // Xóa đơn hàng
        public async Task<bool> DeleteAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrdersDetails)
                .FirstOrDefaultAsync(o => o.OrdersId == id);

            if (order == null) return false;

            _context.OrdersDetails.RemoveRange(order.OrdersDetails);
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}