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

        [HttpPatch("updating")]
        public async Task<IActionResult> UpdateCart([FromBody] List<CartItemUpdateRequest> request)
        {
            await _cartService.UpdateCart(request);
            return Ok();
        }

        [HttpPost("adding/{Id}")]
        public async Task<IActionResult> AddBookToCart([FromBody] CartItemAddRequest request, [FromRoute] int Id)
        {
            await _cartService.AddBookToCard(request.Quantity, Id);
            return Ok();
        }

        [HttpDelete("deleting/{Id}")]
        public async Task <IActionResult> RemoveBookFromCart([FromRoute] int Id)
        {
            var response = await _cartService.RemoveBookFromCart(Id);
            return Ok(response);
        }

        [HttpPatch("updating-item/{Id}")]
        public async Task<IActionResult> UpdateItem([FromBody] CartItemUpdateRequest request, [FromRoute] int Id)
        {
            await _cartService.AddBookToCard(request.Quantity, Id);
            return Ok();
        }
       
    }
}
