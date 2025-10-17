using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class BookHomeOverviewResponse
    {
        public string ImageLink { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public string PublisherName { get; set; }
        public decimal SalePrice { get; set; }
        public int StockQuantity { get; set; }

        public BookHomeOverviewResponse(Book book) {
            foreach (var bookimage in book.BookImages)
            {
                if (bookimage.IsMain == true) {
                    ImageLink = bookimage.BookImageUrl;
                    break;
                }
            }
            BookName = book.BookName;
            AuthorName = book.Author.AuthorName;
            PublisherName = book.Publisher.PublisherName;
            SalePrice = (decimal)book.SalePrice;
            StockQuantity = (int)book.StockQuantity;

        }

    }
}
