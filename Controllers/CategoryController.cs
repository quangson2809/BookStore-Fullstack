using Microsoft.AspNetCore.Mvc;

namespace BOOKSTORE.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
