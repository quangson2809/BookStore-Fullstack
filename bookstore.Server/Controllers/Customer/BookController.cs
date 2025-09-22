using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Customer
{
    public class BookController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
