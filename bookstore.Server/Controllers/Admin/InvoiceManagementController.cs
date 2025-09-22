using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Admin
{
    public class InvoiceManagementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
