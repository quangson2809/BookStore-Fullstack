using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class BookHomeOverviewResponse
    {
        public string ImageLink { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public string PublisherName { get; set; }
        public int SalePrice { get; set; }
        public int StockQuantity { get; set; }
        public string Language { get; set; }

        public BookHomeOverviewResponse(Book book) {
            foreach (var bookimage in book.BookImages)
            {
                if (bookimage.IsMain == true) {
                    ImageLink = bookimage.BookImageUrl;
                    break;
                }
            }
            BookName = book.BookName;
            AuthorName = book.Author;
            PublisherName = book.Publisher;
            SalePrice = (int)book.SalePrice;
            StockQuantity = (int)book.StockQuantity;
            Language = book.Language;
        }

    }
}
