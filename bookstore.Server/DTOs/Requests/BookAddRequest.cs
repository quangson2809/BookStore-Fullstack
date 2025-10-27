namespace bookstore.Server.DTOs.Requests
{
    public class BookAddRequest
    {
        public List<string> ImageUrls { get; set; } = new List<string>();
        public string Name { get; set; }
        public string ISBN { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int Quantity { get; set; }
        public int SalePrice { get; set; }
        public int OriginalPrice { get; set; }
        public int PageNumber { get; set; }
        public DateTime PublishTime { get; set; }
        public int CategoryId { get; set; }
        public string Language { get; set; }
    }
}
