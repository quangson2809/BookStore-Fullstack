using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class BookHomeOverviewResponse
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int SalePrice { get; set; }
        public int OriginalPrice { get; set; }
        public int Quantity { get; set; }
        public string Language { get; set; }

        public BookHomeOverviewResponse(Book book) {
            foreach (var bookimage in book.BookImages)
            {
                if (bookimage.IsMain == true) {
                    ImageLink = bookimage.BookImageUrl;
                    break;
                }
            }
            Id = book.BookId;
            Name = book.BookName;
            Author = book.Author;
            Publisher = book.Publisher;
            SalePrice = (int)book.SalePrice;
            OriginalPrice = (int)book.OriginalPrice;
            Quantity = (int)book.StockQuantity;
            Language = book.Language;
        }

    }
}
