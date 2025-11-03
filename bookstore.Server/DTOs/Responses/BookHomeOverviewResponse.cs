using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class BookHomeOverviewResponse
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int SalePrice { get; set; }
        public int OriginalPrice { get; set; }
        public int Quantity { get; set; }
        public string Language { get; set; }

        

    }
}
