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

        //[Authorize(Roles = "Admin")]
        [HttpPost("adding")]
        public async Task<IActionResult> AddBook([FromForm] BookAddRequest request, [FromForm] List<IFormFile> Images)
        {
            var response = await _bookService.AddBook(request,Images);
            return Ok(response);
        }

        [HttpGet("book/{id}")]
        public async Task<IActionResult> GetBookDetail([FromRoute] int id)
        {
            var item = await _bookService.GetBookDetail(id);
            return Ok(item);

        }

        [HttpGet("books")]
        public async Task<IActionResult> GetAllBook()
        {
            var items = await _bookService.GetAllBook();
            return Ok(items);
        }

        [HttpGet("Searching")]
        public async Task SearchBook<IActionResult>([FromBody] BookSearchRequest request)
        {

        }

        //[Authorize(Roles = "Admin")]
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int Id)
        {
            var response = await _bookService.DeleteBook(Id);
            return Ok(response);
        }

        //[Authorize(Roles = "Admin")]
        [HttpPatch("updating")]
        public async Task<IActionResult> UpdateBook( [FromBody] BookUpdateRequest request)
        {
            var response = await _bookService.UpdateBook(request);
            return Ok(response);
        }

    }
}
