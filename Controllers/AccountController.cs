using Microsoft.AspNetCore.Mvc;

namespace BOOKSTORE.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
