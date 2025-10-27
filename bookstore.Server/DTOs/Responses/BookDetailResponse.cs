using System.Runtime.CompilerServices;
using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class BookDetailResponse
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
        public DateTime PublicTime { get; set; }
        public string CategoryName { get; set; }
        public string Language { get; set; }

        public BookDetailResponse(Book book)
        {
            foreach (var image in book.BookImages)
            {
                ImageUrls.Add(image.BookImageUrl);
            }
            Name = book.BookName;
            ISBN = book.Isbn;
            Author = book.Author;
            Publisher = book.Publisher;
            Quantity = book.StockQuantity ?? 0;
            SalePrice = (int)(book.SalePrice ?? 0);
            OriginalPrice = (int)book.OriginalPrice;
            PageNumber = book.PageNumber ?? 0;
            PublicTime = book.PublishTime;
            CategoryName = book.Category.CategoryName;
            Language = book.Language;
        }
    }
}
