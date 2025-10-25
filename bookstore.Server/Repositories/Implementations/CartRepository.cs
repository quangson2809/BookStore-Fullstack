using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Data;
using Microsoft.EntityFrameworkCore;
using bookstore.Server.DTOs.Requests;

namespace bookstore.Server.Repositories.Implementations
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        public CartRepository(BookStoreDbContext dbContext) : base(dbContext)
        {

        }

        public async Task AddBookToCart(int cartId, int Quantity, Book book)
        {
            var cart = await _table
                .Include(c => c.CartDetails)
                .FirstOrDefaultAsync(c => c.CartId == cartId);

             cart.CartDetails.Add(new CartDetail
            {
                BookId = book.BookId,
                Quantity = Quantity,
                TotalAmount = Quantity * book.SalePrice
            });
        }

        public async Task CreateCart(int userId)
        {
            await _table.AddAsync(new Cart
            {
                UserId = userId
            });
        }
        public async Task<Cart> GetByIdAsync(int cardId)
        {
            Cart cart = await _table
                .Include(c => c.CartDetails)
                .ThenInclude(cd => cd.Book)
                .FirstOrDefaultAsync(c => c.CartId == cardId);

            return cart;

        }
        public async Task<int> GetCartIdByUserId(int userId)
        {
            var cart = await _table
                .Include(c=> c.User)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            int cartId = cart.CartId;
            return cartId;
        }

        public async Task RemoveBookFromCart(int cartId, int bookId)
        {
            Cart cart = await _table
                .Include(c => c.CartDetails)
                .FirstOrDefaultAsync(c => c.CartId == cartId);

            var cartDetai = cart.CartDetails.FirstOrDefault(cd => cd.BookId == bookId);

            cart.CartDetails.Remove(cartDetai);
            await _dbContext.SaveChangesAsync();
        }

    }
}
