using Microsoft.AspNetCore.Mvc;

namespace BOOKSTORE.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
