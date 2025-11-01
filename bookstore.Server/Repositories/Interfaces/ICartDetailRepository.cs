using bookstore.Server.Repositories.Interfaces;
  using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface ICartDetailRepository : IGenericRepository<CartDetail>
    {
        Task UpdateBookCart(int cartId, int bookId,int Quantity);
        Task AddBookCart(int CartId, int BookId, int Quantity);
    }
}
