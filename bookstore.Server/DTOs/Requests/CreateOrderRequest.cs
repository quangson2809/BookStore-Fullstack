namespace bookstore.Server.DTOs.Requests
{
    public class CreateOrderRequest
    {
        public int UserId { get; set; }
        public int? PaymentId { get; set; }
        public List<OrderDetailRequest> OrderDetails { get; set; } = new();
    }

    public class OrderDetailRequest
    {
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
