using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.Repositories;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;

namespace bookstore.Server.Services.implementations
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRespository;
        public BookService(IBookRepository bookRepository)
        {
            _bookRespository = bookRepository;
        }

        public async Task<StatusResponse> AddBook(BookAddRequest request)
        {
            Book book = new Book()
            {
                BookName = request.Name,
                Isbn = request.ISBN,
                Author = request.Author,
                Publisher = request.Publisher,
                StockQuantity = request.Quantity,
                SalePrice = request.SalePrice,
                OriginalPrice = request.OriginalPrice,
                PageNumber = request.PageNumber,
                PublishTime = request.PublishTime,
                CategoryId = request.CategoryId,
                Language = request.Language
            }; 
            if (request.ImageUrls.Count != 0 )
                foreach (var imageurl in request.ImageUrls)
                {
                    book.BookImages.Add(new BookImage() 
                    { 
                        BookImageUrl = imageurl
                    });
                }

            await _bookRespository.Create(book);
            return new StatusResponse(true, "Đã thêm sách mới");
        }

        // Implement book-related methods here
        public async Task<StatusResponse> DeleteBook(int bookId)
        {
            await _bookRespository.DeleteAsync(bookId);
            return new StatusResponse(true, "Đã xoá sách");
        }

        public async Task<IEnumerable<BookHomeOverviewResponse>> GetAllBook()
        {
            //List<Book> books = await _bookRespository.GetAllAsync();
            List<BookHomeOverviewResponse> bookHome= new List<BookHomeOverviewResponse>();
            foreach (var item in await _bookRespository.GetAllAsync())
            {
                bookHome.Add(new BookHomeOverviewResponse(item));
            }
            return bookHome;
        }

        public async Task<BookDetailResponse> GetBookDetail(int bookId)
        {
            Book book = await _bookRespository.GetByIdAsync(bookId);
            if (book == null)
            {
                return null;
            }
            BookDetailResponse bookDetailResponse = new BookDetailResponse(book);
            return bookDetailResponse;
        }

        public async Task<StatusResponse> UpdateBook(BookUpdateRequest request)
        {
            Book book = new Book()
            {
               
                BookId = request.Id,
                BookName = request.Name,
                Isbn = request.ISBN,
                Author = request.Author,
                Publisher = request.Publisher,
                StockQuantity = request.Quantity,
                SalePrice = request.SalePrice,
                OriginalPrice = request.OriginalPrice,
                PageNumber = request.PageNumber,
                PublishTime = request.PublishTime,
                CategoryId = request.CategoryId,
                Language = request.Language,
            };
            foreach (var item in request.ImageUrls)
            {
                book.BookImages.Add(new BookImage
                {
                    BookImageUrl = item,
                });
            }
            await _bookRespository.UpdateAsync(book);
            
            return new StatusResponse(true, "Cập nhật sách thành công");

        }
    }
}