using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Entities;

namespace bookstore.Server.Services.Interfaces
{
    public interface ICartService
    {
        Task<StatusResponse> AddBookToCard(int Quantity, int BookId);
        Task<StatusResponse> AddBookToCard(int Quantity, int CartId, int BookId);

        Task<CartDetailResponse> GetDetailCart();
        Task<CartDetailResponse> GetDetailCart(int CartId);

        Task UpdateCart(List<CartItemUpdateRequest> request);

        Task <StatusResponse>UpdateCart(int Quantity, int bookId);
        Task <StatusResponse>UpdateCart(int Quantity,int CartId, int bookId);

        Task<StatusResponse> RemoveBookFromCart(int BookId);
        Task<StatusResponse> RemoveBookFromCart(int CartId, int BookId);

        Task CreateCartForUser(Cart cart);
    }
}