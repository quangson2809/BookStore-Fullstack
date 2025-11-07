namespace bookstore.Server.DTOs.Responses
{
    public class OrderResponse
    {
        public int OrdersId { get; set; }
        public string? OrdersStatus { get; set; }
        public string? UserName { get; set; }
        public string? PaymentMethod { get; set; }
        public DateTime? CreateTime { get; set; }

        //Phản hồi thông tin khách hàng`
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public List<OrderDetailResponse> OrderDetails { get; set; } = new();
    }

    public class OrderDetailResponse
    {
        public int BookId { get; set; }
        public string? BookTitle { get; set; }
        public int Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
