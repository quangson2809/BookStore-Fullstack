using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategory()
        {
            var response = await _categoryService.GetAllCategories();
            return Ok(response);
        }
    }
}
