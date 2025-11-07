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
        private readonly IGenericRepository<Book> _bookRepo;

        public OrderService(
            IOrderRepository orderRepository,
            IGenericRepository<OrdersDetail> orderDetailRepo,
            IGenericRepository<Book> bookRepo)
        {
            _orderRepository = orderRepository;
            _orderDetailRepo = orderDetailRepo;
            _bookRepo = bookRepo;
        }
        //Lấy tat cả đơn hàng
        public async Task<IEnumerable<OrderResponse>> GetAllAsync()
        {
            var orders = await _orderRepository.GetAllAsync();
            if (orders == null || !orders.Any())
                throw new Exception("Không có đơn hàng nào!");
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
            if (o == null) throw new Exception("Không tìm thấy đơn hàng!");

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
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var order = new Order
            {
                UserId = request.UserId,
                PaymentId = request.PaymentId,
                OrdersStatus = request.OrdersStatus ?? "Pending",
                CreateTime = DateTime.Now,

                //  lưu thông tin khách hàng
                FullName = request.FullName,
                Phone = request.Phone,
                Address = request.Address,
                Email = request.Email
            };

            await _orderRepository.AddAsync(order);
            await _orderRepository.SaveChangesAsync();

            // Thêm chi tiết đơn hàng
            if (request.OrderDetails == null || !request.OrderDetails.Any())
                throw new Exception("Đơn hàng không có chi tiết sản phẩm nào.");

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

                //  Trừ hàng tồn
                var book = await _bookRepo.GetByIdAsync(detail.BookId);
                if (book == null)
                    throw new Exception($"Không tìm thấy sách ID = {detail.BookId}");
                if (book.StockQuantity < detail.Quantity)
                    throw new Exception($"Sách '{book.BookName}' không đủ hàng tồn!");
                book.StockQuantity -= detail.Quantity;
                await _bookRepo.UpdateAsync(book);
            }

            await _orderDetailRepo.SaveChangesAsync();
            await _bookRepo.SaveChangesAsync();

            // Lấy lại đơn hàng đã tạo
            var createdOrder = await _orderRepository.GetOrderWithDetailsAsync(order.OrdersId);
            if (createdOrder == null)
                throw new Exception("Không thể lấy lại đơn hàng sau khi tạo.");

            return new OrderResponse
            {
                OrdersId = createdOrder.OrdersId,
                OrdersStatus = createdOrder.OrdersStatus,
                UserName = createdOrder.FullName,
                PaymentMethod = createdOrder.Payment?.MethodName,
                CreateTime = createdOrder.CreateTime,
                OrderDetails = createdOrder.OrdersDetails.Select(d => new OrderDetailResponse
                {
                    BookId = d.BookId,
                    BookTitle = d.Book?.BookName,
                    Quantity = d.Quantity,
                    TotalPrice = d.TotalPrice
                }).ToList()
            };
        }
        // Cập nhật trạng thái
        public async Task<bool> UpdateStatusAsync(int id, string newStatus)
        {
            Console.WriteLine($"[DEBUG] Body nhận: {newStatus ?? "null"}");
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null) throw new Exception("Không tìm thấy đơn hàng!");

            order.OrdersStatus = newStatus;
            await _orderRepository.UpdateAsync(order);
            await _orderRepository.SaveChangesAsync();
            return true;
        }

        // Xóa đơn hàng
        public async Task<bool> DeleteAsync(int id)
        {
            Console.WriteLine($"[DEBUG] Bắt đầu xóa đơn hàng {id}");
            var order = await _orderRepository.GetOrderWithDetailsAsync(id);
            if (order == null)
                throw new Exception("Không tìm thấy đơn hàng!");

            await _orderRepository.DeleteOrderAndDetailsAsync(id);
            Console.WriteLine($"[DEBUG] Xóa đơn hàng {id} và chi tiết thành công");

            return true;
        }




    }
}