namespace bookstore.Server.DTOs.Responses
{
    public class OrderResponse
    {
        public int OrdersId { get; set; }
        public string? OrdersStatus { get; set; } 
        public DateTime? CreateTime { get; set; }

        //Phản hồi thông tin khách hàng`
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public int? ToalPrice { get; set; }

        public List<OrderDetailResponse>? OrderDetails { get; set; } = new List<OrderDetailResponse>();
    }

    public class OrderDetailResponse
    {
        public int Id { get; set; }
        public string? ImageLink { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public int? TotalPrice { get; set; }
    }

    public class OrdersOverviewDashBoardResponse
    {
        public int OrdersId { get; set; }
        public string FullName { get; set; }
        public string? OrdersStatus { get; set; }
        public DateTime? CreateTime { get; set; }
        public int? ToalPrice { get; set; }
        public List<String> Booknames { get; set; } = new List<String>();
    }
}
