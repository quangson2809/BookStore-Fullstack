using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.Repositories;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.SessionCookies;
using Microsoft.AspNetCore.Http.Features;

namespace bookstore.Server.Services.implementations
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly SessionManager  _sessionManager;
        private readonly IBookRepository _bookRepository;

        private int? _currentCartId;

        public CartService(ICartRepository cartRepository,SessionManager sessionManager, IBookRepository bookRepository)
        {
            _sessionManager = sessionManager;
            _cartRepository = cartRepository;
            _bookRepository = bookRepository ;
        }

        public async Task<StatusResponse> AddBookToCard(int Quantity, int BookId)
        {
            Book book = await _bookRepository.GetByIdAsync(BookId);
            if (book == null || book.StockQuantity < Quantity)
                {
                return new StatusResponse(false, "Book not found or insufficient stock.");
            }

            if ( _currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }
           
            await _cartRepository.AddBookToCart((int)_currentCartId, Quantity, book);
            return new StatusResponse(false, "đã thêm");
        }

        public async Task<DetailCartResponse> GetDetailCart()
        {
            if (_currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }

            Cart cart = await _cartRepository.GetByIdAsync((int)_currentCartId);
            DetailCartResponse detailCartResponse = new DetailCartResponse(cart);
           
            return detailCartResponse;
        }

        public async Task<StatusResponse> RemoveBookFromCart(int bookId)
        {
            if (_currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }

            await _cartRepository.RemoveBookFromCart((int)_currentCartId, bookId);
            return new StatusResponse(true, "Đã xóa sách khỏi giỏ hàng");
        }

        public async Task UpdateCart(List<CartItemUpdateRequest> request)
        {
            Cart cart = new Cart();
            cart.CartDetails = new List<CartDetail>();

            foreach (CartItemUpdateRequest item in request)
            {
                Book book = await _bookRepository.GetByIdAsync(item.BookId);
                CartDetail cartDetail = new CartDetail
                {
                    BookId = item.BookId,
                    Quantity = item.Quantity,
                    CartId = (int)_currentCartId,
                    TotalAmount = book.SalePrice * item.Quantity
                };
                cart.CartDetails.Add(cartDetail);
            }

            await _cartRepository.UpdateAsync(cart);
        }
    }
}