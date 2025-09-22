using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Admin
{
    public class AuthControlller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
