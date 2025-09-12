using Microsoft.AspNetCore.Mvc;

namespace BOOKSTORE.Models
{
    public class User : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
