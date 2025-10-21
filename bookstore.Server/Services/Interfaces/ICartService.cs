using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface ICartService
    {
        Task<StatusResponse> CreateCart(int Id);
        Task<StatusResponse> AddBookToCard(int Quantity, int BookId);
        Task<DetailCartResponse> GetDetailCart();
        Task ChangedQuantity();
        Task LoadPrice();
    }
}