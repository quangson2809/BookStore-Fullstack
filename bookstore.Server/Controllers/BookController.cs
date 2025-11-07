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
            try
            {
                var response = await _bookService.AddBook(request, Images);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
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
        [HttpDelete("deleting/{Id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int Id)
        {
            var response = await _bookService.DeleteBook(Id);
            return Ok(response);
        }

        //[Authorize(Roles = "Admin")]
        [HttpPatch("updating/{Id}")]
        public async Task<IActionResult> UpdateBook([FromRoute] int Id, [FromForm] BookUpdateRequest request, [FromForm] List<IFormFile> Images)
        {
            try
            {
                var response = await _bookService.UpdateBook(Id, request, Images);
                return Ok(response);
            }
            catch (Exception ex) 
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }

    }
}
