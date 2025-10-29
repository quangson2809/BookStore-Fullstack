using bookstore.Server.DTOs.Requests;
using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface ICartRepository : IGenericRepository<Cart>
    {
        Task AddBookToCart(int cartId,int Quantity, int BookId);
        Task CreateCart(int userId);
        Task <int> GetCartIdByUserId(int userId);
        Task RemoveBookFromCart(int cartId, int bookId);
    }
}
