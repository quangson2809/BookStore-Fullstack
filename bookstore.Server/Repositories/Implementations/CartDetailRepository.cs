using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Entities;
using bookstore.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Repositories.Implementations
{
    public class CartDetailRepository : GenericRepository<CartDetail>, ICartDetailRepository
    {
        public CartDetailRepository(BookStoreDbContext dbContext) : base(dbContext)
        {   
        }

        public async Task UpdateBookCart(int cartId, int bookId, int Quantity)
        {
            await _table
                .Where(cd => cd.CartId == cartId && cd.BookId == bookId)
                .ExecuteUpdateAsync(cd => cd
                    .SetProperty(cdt => cdt.Quantity, Quantity)
                );
        }
        public async Task AddBookCart(int CartId, int BookId, int Quantity)
        {
            var cartDetail = new CartDetail
            {
                CartId = CartId,
                BookId = BookId,
                Quantity = Quantity
            };
            await _table.AddAsync(cartDetail);
        }

    }
}
