namespace bookstore.Server.DTOs.Requests
{
    public class CartItemUpdateRequest
    {
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
