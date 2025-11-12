using bookstore.Server.DTOs.Responses;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services.Interfaces;

namespace bookstore.Server.Services.implementations
{
    public class CategoryService : ICategoryService
    {
        ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository) {
            _categoryRepository = categoryRepository;        
        }

        public async Task<List<CategoryResponse>> GetAllCategories()
        {
            List<CategoryResponse> list = new List<CategoryResponse>();
            List<Category> categories = (List<Category>) await _categoryRepository.GetAllAsync();
            foreach(Category cat in categories)
            {
                list.Add(new CategoryResponse
                {
                    Id = cat.CategoryId,
                    Name = cat.CategoryName
                });
            }
            
            return list;
        }

    }
}
