using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Admin
{
    public class UserManagementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
