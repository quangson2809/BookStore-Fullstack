using bookstore.Server.Entities;

namespace bookstore.Server.DTOs.Responses
{
    public class BookCartOverviewResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int SalePrice { get; set; }
        public int Quantity { get; set; }
        public int TotalAmount { get; set; }
        
        public BookCartOverviewResponse(CartDetail cartDetail)
        {
            this.Id = cartDetail.BookId;
            this.Name = cartDetail.Book.BookName;
            this.Author = cartDetail.Book.Author;
            this.SalePrice = (int)cartDetail.Book.SalePrice;
            this.Quantity = cartDetail.Quantity;
            this.TotalAmount = SalePrice * Quantity;
        }
    }
}
