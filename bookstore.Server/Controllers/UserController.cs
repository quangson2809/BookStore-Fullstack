using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
