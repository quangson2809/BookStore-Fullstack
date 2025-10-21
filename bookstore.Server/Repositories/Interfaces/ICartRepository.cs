using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task AddBookToCart(int cartId,int Quantity, Book book);
        Task CreateNewCart(int userId);
        Task <int> GetCartIdByUserId(int userId);
    }
}
