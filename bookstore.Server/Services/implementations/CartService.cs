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
        private readonly ICartRepository _cartRepository;
        private readonly SessionManager  _sessionManager;
        private readonly IBookRepository _bookRepository;
        private readonly ICartDetailRepository _cartDetailRepository;

        private int? _currentCartId;

        public CartService(ICartRepository cartRepository,SessionManager sessionManager, IBookRepository bookRepository, ICartDetailRepository cartDetailRepository)
        {
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
            await _cartRepository.SaveChangesAsync();
            return new StatusResponse(true, "Đã xóa sách khỏi giỏ hàng");
        }

        public async Task<StatusResponse> RemoveBookFromCart(int CartId, int bookId)
        {
            await _cartRepository.RemoveBookFromCart(CartId, bookId);
            await _cartRepository.SaveChangesAsync();
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
            await _cartRepository.SaveChangesAsync();
        }

        public async Task<StatusResponse> UpdateCart(int bookId, int Quantity)
        {
            await _cartDetailRepository.UpdateBookCart((int)_currentCartId, bookId, Quantity);
            await _cartDetailRepository.SaveChangesAsync();
            return new StatusResponse(true, "Đã cập nhật");
        }

        public async Task<StatusResponse> UpdateCart(int CartId, int bookId, int Quantity)
        {
            await _cartDetailRepository.UpdateBookCart(CartId, bookId, Quantity);
            await _cartDetailRepository.SaveChangesAsync();
            return new StatusResponse(true, "Đã cập nhật");
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

            CartDetailResponse detailCartResponse = new CartDetailResponse();
             
            foreach (CartDetail cartDetail in cart.CartDetails)
            {
                BookCartOverviewResponse item = new BookCartOverviewResponse() {
                    Id = cartDetail.BookId,
                    Name = cartDetail.Book.BookName,
                    Author = cartDetail.Book.Author,
                    SalePrice = (int)cartDetail.Book.SalePrice,
                    Quantity = cartDetail.Quantity,
                    TotalAmount = (int)cartDetail.Book.SalePrice * cartDetail.Quantity
                };

                foreach (var bookimage in cartDetail.Book.BookImages)
                {
                    item.ImageLink = bookimage.BookImageUrl;
                    break;
                }

                detailCartResponse.Items.Add(item);
                detailCartResponse.TotalPrice += item.TotalAmount;
            }

            return detailCartResponse;
        }

        public async Task<CartDetailResponse> GetDetailCart(int CartId)
        {
            Cart cart = await _cartRepository.GetByIdAsync(CartId);

            CartDetailResponse detailCartResponse = new CartDetailResponse();

            foreach (CartDetail cartDetail in cart.CartDetails)
            {
                BookCartOverviewResponse item = new BookCartOverviewResponse()
                {
                    Id = cartDetail.BookId,
                    Name = cartDetail.Book.BookName,
                    Author = cartDetail.Book.Author,
                    SalePrice = (int)cartDetail.Book.SalePrice,
                    Quantity = cartDetail.Quantity,
                    TotalAmount = (int)cartDetail.Book.SalePrice * cartDetail.Quantity
                };
                
                foreach (var bookimage in cartDetail.Book.BookImages)
                {
                    item.ImageLink = bookimage.BookImageUrl;
                    break;
                }

                detailCartResponse.Items.Add(item);
                detailCartResponse.TotalPrice += item.TotalAmount;
            }

            return detailCartResponse;
        }


        public async Task<StatusResponse> AddBookToCard( int BookId, int Quantity)
        {

            if (_currentCartId == null)
            {
                int userId = _sessionManager.GetUserId();
                _currentCartId = await _cartRepository.GetCartIdByUserId(userId);
            }

            Cart cart = await _cartRepository.GetByIdAsync((int)_currentCartId);
            int old_Quantity = 0;
            bool bookExistsInCart = false;
            foreach (CartDetail cd in cart.CartDetails)
            {
                if (cd.BookId == BookId)
                {
                    bookExistsInCart = true;
                    old_Quantity = cd.Quantity;
                    break;
                }

            }
            if (bookExistsInCart)
            {
                return await UpdateCart((int)_currentCartId, BookId, old_Quantity + Quantity);
            }
            await _cartDetailRepository.AddBookCart((int)_currentCartId, BookId, Quantity);
            await _cartDetailRepository.SaveChangesAsync();
            return new StatusResponse(true, "Đã thêm");
        }

        public async Task<StatusResponse> AddBookToCard( int CartId, int BookId, int Quantity)
        {
            Cart cart =  await _cartRepository.GetByIdAsync(CartId);
            int old_Quantity = 0;
            bool bookExistsInCart = false;
            foreach (CartDetail cd in cart.CartDetails)
            {
                if (cd.BookId == BookId)
                {
                    bookExistsInCart = true;
                    old_Quantity = cd.Quantity;
                    break;
                }
                
            }
            if (bookExistsInCart)
            {
               return await UpdateCart(CartId, BookId, old_Quantity + Quantity);
            }
            await _cartDetailRepository.AddBookCart(CartId,BookId, Quantity);
            await _cartDetailRepository.SaveChangesAsync();
            return new StatusResponse(true, "Đã thêm");
        }
    }
}