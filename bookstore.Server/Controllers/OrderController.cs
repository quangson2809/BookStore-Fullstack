using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bookstore.Server.Entities;
using bookstore.Server.Data;
using System.Threading.Tasks;

namespace bookstore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly BookStoreDbContext _context;

        public OrderController(BookStoreDbContext context)
        {
            _context = context;
        }

        //  Lấy toàn bộ danh sách đơn hàng (kèm User, Payment, OrdersDetails)
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                .ToListAsync();

            return Ok(orders);
        }

        // Lấy thông tin đơn hàng theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Payment)
                .Include(o => o.OrdersDetails)
                .FirstOrDefaultAsync(o => o.OrdersId == id);

            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng!" });

            return Ok(order);
        }

        // Tạo mới đơn hàng 
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            if (order == null)
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ!" });

            order.CreateTime = DateTime.Now;
            order.OrdersStatus = "Pending";

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.OrdersId }, order);
        }

        //  Cập nhật thông tin đơn hàng
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order updatedOrder)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng!" });

            order.OrdersStatus = updatedOrder.OrdersStatus;
            order.PaymentId = updatedOrder.PaymentId;
            order.UserId = updatedOrder.UserId;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật đơn hàng thành công!" });
        }

        //  Xóa đơn hàng
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng!" });

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa đơn hàng!" });
        }
    }
}
