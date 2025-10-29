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

        //[HttpGet("cart")]
        //public async Task<IActionResult> GetCart()
        //{
        //    var cartDetail = await _cartService.GetDetailCart();
        //    return Ok(cartDetail);
        //}

        //[HttpPatch("updating")]
        //public async Task<IActionResult> UpdateCart([FromBody] List<CartItemUpdateRequest> request)
        //{
        //    await _cartService.UpdateCart(request);
        //    return Ok();
        //}

        [HttpGet("{CartId}")]
        public async Task<IActionResult> GetCart([FromRoute] int CartId)
        {
            var cartDetail = await _cartService.GetDetailCart(CartId);
            return Ok(cartDetail);
        }

        //[HttpPost("adding/{ItemId}")]
        //public async Task<IActionResult> AddBookToCart([FromBody] CartItemAddRequest request, [FromRoute] int ItemId)
        //{
        //    await _cartService.AddBookToCard(request.Quantity, ItemId);
        //    return Ok();
        //}

        [HttpPost("{CartId}/adding/{ItemId}")]
        public async Task<IActionResult> AddBookToCart([FromBody] CartItemAddRequest request,[FromRoute] int CartId, [FromRoute] int ItemId)
        {
            await _cartService.AddBookToCard(CartId, request.Quantity, ItemId);
            return Ok();
        }

        //[HttpDelete("deleting/{ItemId}")]
        //public async Task <IActionResult> RemoveBookFromCart([FromRoute] int ItemId)
        //{
        //    var response = await _cartService.RemoveBookFromCart(ItemId);
        //    return Ok(response);
        //}

        [HttpDelete("{CartId}/deleting/{ItemId}")]
        public async Task<IActionResult> RemoveBookFromCart([FromRoute] int CartId, [FromRoute] int ItemId)
        {
            var response = await _cartService.RemoveBookFromCart(CartId, ItemId);
            return Ok(response);
        }

        //[HttpPatch("updating-item/{Id}")]
        //public async Task<IActionResult> UpdateItem([FromBody] CartItemUpdateRequest request, [FromRoute] int Id)
        //{
        //    await _cartService.AddBookToCard(request.Quantity, Id);
        //    return Ok();
        //}

        [HttpPatch("{CartId}/updating-item/{ItemId}")]
        public async Task<IActionResult> UpdateItem([FromBody] CartItemUpdateRequest request,[FromRoute] int CartId ,[FromRoute] int ItemId)
        {
            await _cartService.AddBookToCard(request.Quantity, CartId,ItemId);
            return Ok();
        }
    }
}
