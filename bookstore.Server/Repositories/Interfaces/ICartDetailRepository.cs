using bookstore.Server.Repositories.Interfaces;
  using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface ICartDetailRepository : IGenericRepository<CartDetail>
    {
        Task UpdateCartDetail(int cartId, int bookId,int Quantity);
    }
}
