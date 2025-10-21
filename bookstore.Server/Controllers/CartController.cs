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

        [HttpGet("detailcart")]
        public async Task<IActionResult> GetCart()
        {
            return Ok();
        }

        [HttpPut("update/{Id}")]
        public async Task<IActionResult> UpdateCart([FromBody]int Quantity, [FromRoute] int Id)
        {
            return Ok();
        }

        [HttpPost("addbook/{Id}")]
        public async Task<IActionResult> AddBookToCart([FromBody] int Quantity, [FromRoute] int Id)
        {
            await _cartService.AddBookToCard(Quantity, Id);
            return Ok();
        }


        
        


    }
}
