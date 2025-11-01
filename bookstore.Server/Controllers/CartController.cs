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

        //[HttpPatch("updatingList")]
        //public async Task<IActionResult> UpdateCart([FromBody] List<CartItemUpdateRequest> request)
        //{
        //    var response = await _cartService.UpdateCart(request);
        //    return Ok(response);
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
        //    var response = await _cartService.AddBookToCard(ItemId, request.Quantity);
        //    return Ok(response);
        //}

        [HttpPost("{CartId}/adding/{ItemId}")]
        public async Task<IActionResult> AddBookToCart([FromBody] CartItemAddRequest request,[FromRoute] int CartId, [FromRoute] int ItemId)
        {
            var response = await _cartService.AddBookToCard(CartId, ItemId,request.Quantity);
            return Ok(response);
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

        //[HttpPatch("updating/{Id}")]
        //public async Task<IActionResult> UpdateItem([FromBody] CartItemAddRequest request, [FromRoute] int Id)
        //{
        //    var response =await _cartService.UpdateCart(ItemId, request.Quantity);
        //    return Ok(response);
        //}

        [HttpPatch("{CartId}/updating/{ItemId}")]
        public async Task<IActionResult> UpdateItem([FromBody] CartItemAddRequest request,[FromRoute] int CartId ,[FromRoute] int ItemId)
        {
            var response = await _cartService.UpdateCart(CartId, ItemId, request.Quantity);
            return Ok(response);
        }
    }
}
