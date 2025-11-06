namespace bookstore.Server.DTOs.Requests
{
    public class CreateOrderRequest
    {
        public int UserId { get; set; }
        public int? PaymentId { get; set; }

        public string? OrdersStatus { get; set; }
        public List<OrderDetailRequest> OrderDetails { get; set; } = new();
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
    }

    public class OrderDetailRequest
    {

        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }

}
