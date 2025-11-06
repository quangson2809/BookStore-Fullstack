using System.Threading.Tasks;
using bookstore.Server.Data;
using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
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
        // Lấy tất cả đơn hàng
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _orderService.GetAllAsync();
                return Ok(new
                {
                    success = true,
                    message = "Lấy danh sách đơn hàng thành công.",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new StatusResponse(false, ex.Message));
            }
        }

        // Lấy đơn hàng theo ID
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _orderService.GetByIdAsync(id);
                if (result == null)
                    return NotFound(new { message = "Không tìm thấy đơn hàng!" });
                return Ok(new
                {
                    success = true,
                    message = "Lấy đơn hàng thành công.",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new StatusResponse(false, ex.Message));
            }
        }

        // Tạo đơn hàng mới
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequest request)
        {
            try
            {
                var result = await _orderService.CreateAsync(request);
                return Ok(new
                {
                    success = true,
                    message = "Tạo đơn hàng thành công.",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new StatusResponse(false, ex.Message));
            }
        }


        // Cập nhật trạng thái đơn hàng
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string newStatus)
        {
            try {
                var success = await _orderService.UpdateStatusAsync(id, newStatus);
                if (!success) return NotFound(new { message = "Không tìm thấy đơn hàng!" });
                return Ok(new StatusResponse(true, "Cập nhật đơn hàng thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(new StatusResponse(false, ex.Message));
            }
        }


        // Xóa đơn hàng
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _orderService.DeleteAsync(id);
                if (!success) return NotFound(new { message = "Không tìm thấy đơn hàng!" });
                return Ok(new StatusResponse(true, "Đã xóa đơn hàng thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(new StatusResponse(false, ex.Message));
            }
        }
    }
}