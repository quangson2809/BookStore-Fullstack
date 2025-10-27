using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class CartDetailResponse
    {
        public int TotalPrice { get; set; }
        public List<BookCartOverviewResponse> Items { get; set; }
        
        public CartDetailResponse(Cart cart)
        {
            Items = new List<BookCartOverviewResponse>();
            foreach (CartDetail cartDetail in cart.CartDetails)
            {
                BookCartOverviewResponse item = new BookCartOverviewResponse(cartDetail);
                Items.Add(item);
                TotalPrice += item.TotalAmount;
            }
        }
    }
}
