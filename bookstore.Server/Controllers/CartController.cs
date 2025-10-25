using bookstore.Server.DTOs.Requests;
using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly ICartService _cartService;

        public CartController (ICartService cartService )
        {
            _cartService = cartService;
        }

        [HttpGet("cart")]
        public async Task<IActionResult> GetCart()
        {
            var cartDetail = await _cartService.GetDetailCart();
            return Ok(cartDetail);
        }

        [HttpPut("updating")]
        public async Task<IActionResult> UpdateCart([FromBody] List<CartItemUpdateRequest> request)
        {
            return Ok();
        }

        [HttpPost("adding/{Id}")]
        public async Task<IActionResult> AddBookToCart([FromBody] int Quantity, [FromRoute] int Id)
        {
            await _cartService.AddBookToCard(Quantity, Id);
            return Ok();
        }


        
        


    }
}
