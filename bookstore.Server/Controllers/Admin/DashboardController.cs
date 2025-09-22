using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Admin
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
