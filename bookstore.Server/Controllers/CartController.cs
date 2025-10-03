using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    public class CartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
