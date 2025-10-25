using bookstore.Server.Entities;

namespace bookstore.Server.DTOs.Responses
{
    public class BookCartOverviewResponse
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public int SalePrice { get; set; }
        public int Quantity { get; set; }
        public int TotalAmount { get; set; }
        
        public BookCartOverviewResponse(CartDetail cartDetail)
        {
            this.BookId = cartDetail.BookId;
            this.BookName = cartDetail.Book.BookName;
            this.AuthorName = cartDetail.Book.Author;
            this.SalePrice = (int)cartDetail.Book.SalePrice;
            this.Quantity = cartDetail.Quantity;
            this.TotalAmount = (int)cartDetail.TotalAmount;
        }
    }
}
