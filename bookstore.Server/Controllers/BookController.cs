using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;
        public BookController(IBookService bookService) {
            _bookService = bookService;
        }

        [Authorize(Roles ="Admin")]                
        [HttpPost("admin/addbook")]
        public async Task<IActionResult> AddBook([FromBody] AddBookRequest request)
        {
            return Ok();
        }

        [HttpGet("bookdetail/{id}")]
        public async Task<IActionResult> GetBookDetail([FromRoute] int id) 
        {

            return Ok();

        }

        [HttpGet("allbook")]
        public async Task<IActionResult> GetAllBook()
        {
            var items =await _bookService.GetAllBook();
            return Ok(items);
        }

        [HttpGet("Search")]
        public async Task SearchBook<IActionResult>([FromBody] BookSearchRequest request)
        {

        }

    }
}
