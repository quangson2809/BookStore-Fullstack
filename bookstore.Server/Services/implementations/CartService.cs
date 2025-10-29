using bookstore.Server.Data;
using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Entities;
using bookstore.Server.Repositories;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.SessionCookies;
using Microsoft.AspNetCore.Http.Features;

namespace bookstore.Server.Services.implementations
{
    public class CartService : ICartService
    {
        private readonly BookStoreDbContext _dbContext;
        private readonly ICartRepository _cartRepository;
        private readonly SessionManager  _sessionManager;
        private readonly IBookRepository _bookRepository;
        private readonly ICartDetailRepository _cartDetailRepository;

        private int? _currentCartId;

        public CartService(BookStoreDbContext dbContext ,ICartRepository cartRepository,SessionManager sessionManager, IBookRepository bookRepository, ICartDetailRepository cartDetailRepository)
        {
            _dbContext = dbContext;
            _sessionManager = sessionManager;
            _cartRepository = cartRepository;
            _bookRepository = bookRepository;
            _cartDetailRepository = cartDetailRepository;
        }

        public async Task<StatusResponse> RemoveBookFromCart(int bookId)
        {
            if (_currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }

            await _cartRepository.RemoveBookFromCart((int)_currentCartId, bookId);
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "Đã xóa sách khỏi giỏ hàng");
        }

        public async Task<StatusResponse> RemoveBookFromCart(int CartId, int bookId)
        {
            await _cartRepository.RemoveBookFromCart(CartId, bookId);
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "Đã xóa sách khỏi giỏ hàng");
        }

        public async Task UpdateCart(List<CartItemUpdateRequest> request)
        {
            Cart cart = await _cartRepository.GetByIdAsync((int)_currentCartId);
            cart.CartDetails = new List<CartDetail>();

            foreach (CartItemUpdateRequest item in request)
            {
                Book book = await _bookRepository.GetByIdAsync(item.Id);
                CartDetail cartDetail = new CartDetail
                {
                    BookId = item.Id,
                    Quantity = item.Quantity,
                    CartId = (int)_currentCartId,
                };
                cart.CartDetails.Add(cartDetail);
            }

            await _cartRepository.UpdateAsync(cart);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCart(int Quantity, int bookId)
        {
            await _cartDetailRepository.UpdateCartDetail((int)_currentCartId, bookId, Quantity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCart(int CartId, int Quantity, int bookId)
        {
            await _cartDetailRepository.UpdateCartDetail(CartId, bookId, Quantity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CreateCartForUser(Cart cart)
        {
            await _cartRepository.AddAsync( cart);
        }

        public async Task<CartDetailResponse> GetDetailCart()
        {
            if (_currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }

            Cart cart = await _cartRepository.GetByIdAsync((int)_currentCartId);
            CartDetailResponse detailCartResponse = new CartDetailResponse(cart);

            return detailCartResponse;
        }

        public async Task<CartDetailResponse> GetDetailCart(int CartId)
        {
            Cart cart = await _cartRepository.GetByIdAsync(CartId);
            CartDetailResponse detailCartResponse = new CartDetailResponse(cart);

            return detailCartResponse;
        }


        public async Task<StatusResponse> AddBookToCard(int Quantity, int BookId)
        {
            Book book = await _bookRepository.GetByIdAsync(BookId);
            if (book == null || book.StockQuantity < Quantity)
            {
                return new StatusResponse(false, "Book not found or insufficient stock.");
            }

            if (_currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }

            await _cartRepository.AddBookToCart((int)_currentCartId, Quantity, BookId);
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "đã thêm");
        }

        public async Task<StatusResponse> AddBookToCard(int Quantity, int CartId, int BookId)
        {
            await _cartRepository.AddBookToCart(CartId, Quantity, BookId);
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "đã thêm");
        }
    }
}