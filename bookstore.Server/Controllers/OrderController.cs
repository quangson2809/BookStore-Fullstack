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
        [HttpGet("orders")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var responses = await _orderService.GetAll();
                return Ok(responses);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }

        // Lấy đơn hàng theo ID
        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] int UserId)
        {
            try
            {
                var responses = await _orderService.GetByUserId(UserId);
                return Ok(responses);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }

        // Tạo đơn hàng mới
        [HttpPost("Create/{CartId}")]
        public async Task<IActionResult> Create([FromRoute] int CartId, [FromBody] OrderCreateRequest request)
        {
            try
            {
                var response = await _orderService.CreateAsync(CartId,request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }


        // Cập nhật trạng thái đơn hàng
        [HttpPatch("Confirm/{OrderId}")]
        public async Task<IActionResult> UpdateStatus(int OrderId)
        {
            try {
                var response = await _orderService.UpdateStatusAsync(OrderId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }

    }
}