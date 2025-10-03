using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
