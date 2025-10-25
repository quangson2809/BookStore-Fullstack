using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface ICartService
    {
        Task<StatusResponse> AddBookToCard(int Quantity, int BookId);
        Task<DetailCartResponse> GetDetailCart();
        Task UpdateCart(List<CartItemUpdateRequest> request);
        Task<StatusResponse> RemoveBookFromCart(int BookId);
    }
}