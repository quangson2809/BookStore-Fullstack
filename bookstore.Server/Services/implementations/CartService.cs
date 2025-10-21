using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.Repositories;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.SessionCookies;

namespace bookstore.Server.Services.implementations
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly SessionManager  _sessionManager;
        private readonly IBookRepository _bookRepository;
        public CartService(ICartRepository cartRepository,SessionManager sessionManager, IBookRepository bookRepository)
        {
            _sessionManager = sessionManager;
            _cartRepository = cartRepository;
            _bookRepository = bookRepository ;
        }
        // Implement cart-  related methods here
        public async Task<StatusResponse> AddBookToCard(int Quantity, int BookId)
        {
            Book book = await _bookRepository.GetByIdAsync(BookId);
            if (book == null || book.StockQuantity < Quantity)
                {
                return new StatusResponse(false, "Book not found or insufficient stock.");
            }

            int userId =  _sessionManager.GetUserId();
            var cartId = await _cartRepository.GetCartIdByUserId(userId);
            await _cartRepository.AddBookToCart(cartId, Quantity, book);
            return new StatusResponse(false, "đã thêm");

        }

        public Task ChangedQuantity()
        {
            throw new NotImplementedException();
        }

        public Task<StatusResponse> CreateCart(int id)
        {
            throw new NotImplementedException();
        }

        public Task<DetailCartResponse> GetDetailCart()
        {
            throw new NotImplementedException();
        }

        public Task LoadPrice()
        {
            throw new NotImplementedException();
        }
    }
}