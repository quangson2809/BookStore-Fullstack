using bookstore.Server.Entities;

namespace bookstore.Server.DTOs.Responses
{
    public class BookCartOverviewResponse
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int SalePrice { get; set; }
        public int Quantity { get; set; }
        public int TotalAmount { get; set; }
        
    }
}
