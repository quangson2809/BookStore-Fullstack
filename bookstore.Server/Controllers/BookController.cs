using bookstore.Server.DTOs.Requests;
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
        public async Task AddBook<IActionResult>([FromBody] AddBookRequest request)
        {

        }

        [HttpGet("bookdetail/{id}")]
        public async Task GetBookDetail<IActionResult>() { 
            
        }

        [HttpGet("allbook")]
        public async Task GetListBook<IActionResult>()
        {

        }

        [HttpGet("Search")]
        public async Task SearchBook<IActionResult>([FromBody] BookSearchRequest request)
        {

        }

    }
}
