using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Customer
{
    public class AythController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
