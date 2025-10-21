using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Data;
using Microsoft.EntityFrameworkCore;

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

        public async Task CreateNewCart(int userId)
        {

        }

        public async Task<int> GetCartIdByUserId(int userId)
        {
            var cart = await _table
                .Include(c=> c.User)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            int cartId = cart.CartId;
            return cartId;
        }
    }
}
