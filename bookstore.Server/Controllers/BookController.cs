using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/admin/[controller]")]
    public class BookController : Controller
    {
        public BookController() { }

        [HttpGet("hello")]
        public IActionResult SayHello ()
        {
            return Ok("===================hello admin");
        }
    }
}
