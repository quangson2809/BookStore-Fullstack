using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers.Customer
{
    public class InvoiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
