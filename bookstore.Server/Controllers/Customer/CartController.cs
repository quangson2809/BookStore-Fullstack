using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Customer
{
    public class CartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
