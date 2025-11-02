using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.Repositories;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using bookstore.Server.Data;

namespace bookstore.Server.Services.implementations
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRespository;

        private readonly BookStoreDbContext _dbContext;

        private IFileService _fileService;

        public BookService(BookStoreDbContext dbContext, IBookRepository bookRepository, IFileService fileService)
        {
            _fileService = fileService;
            _bookRespository = bookRepository;
            _dbContext = dbContext;
        }

        public async Task<StatusResponse> AddBook(BookAddRequest request, List<IFormFile> formFiles)
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
                Language = request.Language,
                BookImages = new List<BookImage>()
            };

            foreach (var file in formFiles)
            {
                book.BookImages.Add( new BookImage(){
                    BookImageUrl = await _fileService.UpLoadFile(file)
                });
            }

            await _bookRespository.Create(book);
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "Đã thêm sách mới");
        }

        // Implement book-related methods here
        public async Task<StatusResponse> DeleteBook(int bookId)
        {
            await _bookRespository.DeleteAsync(bookId);
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "Đã xoá sách");
        }

        public async Task<IEnumerable<BookHomeOverviewResponse>> GetAllBook()
        {
            //List<Book> books = await _bookRespository.GetAllAsync();
            List<BookHomeOverviewResponse> bookHome= new List<BookHomeOverviewResponse>();
            foreach (Book book in await _bookRespository.GetAllAsync())
            {
                BookHomeOverviewResponse item = new BookHomeOverviewResponse()
                {
                    Id = book.BookId,
                    Name = book.BookName,
                    Author = book.Author,
                    Publisher = book.Publisher,
                    SalePrice = (int)book.SalePrice,
                    OriginalPrice = (int)book.OriginalPrice,
                    Quantity = (int)book.StockQuantity,
                    Language = book.Language
                };

                foreach (var bookimage in book.BookImages)
                {
                    item.ImageLink = bookimage.BookImageUrl;
                    break;
                }
                bookHome.Add(item);
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
            await _dbContext.SaveChangesAsync();
            return new StatusResponse(true, "Cập nhật sách thành công");

        }
    }
}