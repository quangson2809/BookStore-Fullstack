using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Customer
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
