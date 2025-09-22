using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Admin
{
    public class BookManagementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
