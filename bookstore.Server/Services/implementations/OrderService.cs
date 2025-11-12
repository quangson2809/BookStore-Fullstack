using bookstore.Server.Data;
using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Entities;
using bookstore.Server.Repositories;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.SessionCookies;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Services.implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly ICartService _cartService;
        private readonly SessionManager _sessionManager;
        private  int? _currentCartId;
        public OrderService(
            IOrderRepository orderRepository,
            ICartRepository cartRepository,
            SessionManager sessionManager,
            ICartService cartService)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _sessionManager = sessionManager;
            _cartService = cartService;
        }

        public async Task<StatusResponse> CreateAsync(int CartId, OrderCreateRequest Request)
        {
          
            Cart cart =  await _cartRepository.GetByIdAsync(CartId);
            if (cart == null || cart.CartDetails == null || cart.CartDetails.Count ==0)
            {
                throw new Exception("Giỏ hàng trống!");
            }
            
            Order order = new Order
            {
                UserId = cart.UserId,
                CreateTime = DateTime.Now,
                FullName = Request.FullName,
                Phone = Request.Phone,
                Address = Request.Address,
                Email = Request.Email,
                OrdersStatus = "Pending",
                OrdersDetails = new List<OrdersDetail>(),
            };
            foreach( CartDetail cd in cart.CartDetails.ToList())
            {
                if (cd.Quantity > cd.Book.StockQuantity)
                    throw new Exception($"{cd.Book.BookName}số lượng trong kho còn {cd.Book.StockQuantity}");
                OrdersDetail od = new OrdersDetail
                {
                    BookId = cd.BookId,
                    Quantity = cd.Quantity,
                    Order = order
                };
                cd.Book.StockQuantity -= cd.Quantity;
                order.OrdersDetails.Add(od);
                await _cartRepository.RemoveBookFromCart(CartId, cd.BookId);

            }

            await _orderRepository.AddAsync(order);
            await _orderRepository.SaveChangesAsync();
            return new StatusResponse(true, "Đặt hàng thành công");
        }

        public async Task<IEnumerable<OrdersOverviewDashBoardResponse>> GetAll()
        {
            List<OrdersOverviewDashBoardResponse> result = new List<OrdersOverviewDashBoardResponse>();
            foreach(Order order in await _orderRepository.GetAllAsync())
            {
                OrdersOverviewDashBoardResponse orp = new OrdersOverviewDashBoardResponse
                {
                    OrdersId = order.OrderId,
                    OrdersStatus = order.OrdersStatus,
                    FullName = $"{order.User.FirstName}{order.User.LastName}" ?? " null",
                    CreateTime = order.CreateTime,
                    ToalPrice = 0,
                };
                foreach( OrdersDetail od in order.OrdersDetails)
                {
                    if( od.Book != null)
                    {
                        orp.Booknames.Add( od.Book.BookName);
                    }
                    orp.ToalPrice += (int)(od.Book.SalePrice*od.Quantity);
                }
                result.Add(orp);
            }

            return result;
        }

        public Task<OrderResponse?> GetByOrderId(int OrderId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OrderResponse>> GetByUserId(int UserId)
        {
            List<Order> orders = (List<Order>)await _orderRepository.GetOrdersByUserId(UserId);
            if( orders == null || orders.Count ==0)
                throw new Exception("Không tìm thấy đơn hàng nào!");

            List<OrderResponse> result = new List<OrderResponse>();

            foreach( Order order in orders)
            {
                OrderResponse orp = new OrderResponse
                {
                    OrdersId = order.OrderId,
                    OrdersStatus = order.OrdersStatus,
                    CreateTime =  order.CreateTime,
                    FullName = order.FullName ?? " không",
                    Phone = order.Phone ?? " không",
                    Address = order.Address ?? " không",
                    Email = order.Email ?? " không",
                    ToalPrice = 0,
                };
                foreach( OrdersDetail od in order.OrdersDetails)
                {
                    OrderDetailResponse odr = new OrderDetailResponse
                    {
                        Id = od.BookId,
                        Name = od.Book.BookName ,
                        Quantity = od.Quantity,
                        TotalPrice =(int)od.Book.SalePrice * od.Quantity,
                    };
                    orp.OrderDetails!.Add(odr);
                    orp.ToalPrice += (int)(odr.TotalPrice );
                    foreach( var bi in od.Book.BookImages)
                    {
                        odr.ImageLink = bi.BookImageUrl;
                        break;
                    }
                }
                result.Add(orp);
            }

            return result;
        }

        public async Task<StatusResponse> UpdateStatusAsync(int OrderId)
        {
            Order order = await _orderRepository.GetByIdAsync(OrderId);
            if(order == null ) 
                throw new Exception("Không tìm thấy đơn hàng!");
            await _orderRepository.UpdateStatus(OrderId);
            await _orderRepository.SaveChangesAsync();

            return new StatusResponse(true, "Đẫ xác nhận");
        }
    }
}