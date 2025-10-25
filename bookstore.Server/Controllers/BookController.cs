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
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("admin/addbook")]
        public async Task<IActionResult> AddBook([FromBody] AddBookRequest request)
        {
            var status = await _bookService.AddBook(request);
            return Ok();
        }

        [HttpGet("book/{id}")]
        public async Task<IActionResult> GetBookDetail([FromRoute] int id)
        {
            var item = await _bookService.GetBookDetail(id);
            return Ok();

        }

        [HttpGet("books")]
        public async Task<IActionResult> GetAllBook()
        {
            var items = await _bookService.GetAllBook();
            return Ok(items);
        }

        [HttpGet("Search")]
        public async Task SearchBook<IActionResult>([FromBody] BookSearchRequest request)
        {

        }

        [HttpDelete("delele/{Id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int Id)
        {
            var result = await _bookService.DeleteBook(Id);
            return Ok(result);
        }
        [HttpPut("update/{Id}")]
        public async Task<IActionResult> UpdateBook([FromRoute] int Id, [FromBody] UpdateBookRequest request)
        {
            return Ok();
        }

    }
}
