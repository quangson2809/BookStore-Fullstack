using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class DetailCartResponse
    {
        public int TotalPrice { get; set; }
        public List<BookCartOverviewResponse> Items { get; set; }
        
        public DetailCartResponse(Cart cart)
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
