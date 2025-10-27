using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface ICartService
    {
        Task<StatusResponse> AddBookToCard(int Quantity, int BookId);
        Task<CartDetailResponse> GetDetailCart();
        Task UpdateCart(List<CartItemUpdateRequest> request);
        Task UpdateCart(int Quantity, int bookId);
        Task<StatusResponse> RemoveBookFromCart(int BookId);
        Task CreateCartForUser(int UserId);
    }
}