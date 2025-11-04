using System.Threading.Tasks;
using bookstore.Server.Data;
using bookstore.Server.DTOs.Requests;
using bookstore.Server.Entities;
using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _orderService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _orderService.GetByIdAsync(id);
            if (result == null) return NotFound(new { message = "Không tìm thấy đơn hàng!" });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequest request)
        {
            var result = await _orderService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string newStatus)
        {
            var success = await _orderService.UpdateStatusAsync(id, newStatus);
            if (!success) return NotFound(new { message = "Không tìm thấy đơn hàng!" });
            return Ok(new { message = "Đã cập nhật trạng thái đơn hàng!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _orderService.DeleteAsync(id);
            if (!success) return NotFound(new { message = "Không tìm thấy đơn hàng!" });
            return Ok(new { message = "Đã xóa đơn hàng!" });
        }
    }
}