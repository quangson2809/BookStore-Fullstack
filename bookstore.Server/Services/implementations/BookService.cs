using bookstore.Server.Data;
using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Entities;
using bookstore.Server.Repositories;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookstore.Server.Services.implementations
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRespository;
        private readonly IImageRepoeitory _imageRepository;

        private IFileService _fileService;

        public BookService( IBookRepository bookRepository,IImageRepoeitory imageRepoeitory, IFileService fileService)
        {
            _fileService = fileService;
            _bookRespository = bookRepository;
            _imageRepository = imageRepoeitory;
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
            await _bookRespository.SaveChangesAsync();
            return new StatusResponse(true, "Đã thêm sách mới");
        }

        // Implement book-related methods here
        public async Task<StatusResponse> DeleteBook(int bookId)
        {
            await _bookRespository.DeleteAsync(bookId);
            await _bookRespository.SaveChangesAsync();
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
                    Category = book.Category != null ? book.Category.CategoryName : "",
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

        public async Task<StatusResponse> UpdateBook(int BookId, BookUpdateRequest request, List<IFormFile> Images)
        {
            // Lấy book từ db để có tracking entity
            var book = await _bookRespository.GetByIdAsync(BookId);
            if (book == null)
                return new StatusResponse(false, "Sách không tồn tại");

            // Cập nhật thuộc tính sách
            book.BookName = request.Name;
            book.Isbn = request.ISBN;
            book.Author = request.Author;
            book.Publisher = request.Publisher;
            book.StockQuantity = request.Quantity;
            book.SalePrice = request.SalePrice;
            book.OriginalPrice = request.OriginalPrice;
            book.PageNumber = request.PageNumber;
            book.PublishTime = request.PublishTime;
            book.CategoryId = request.CategoryId;
            book.Language = request.Language;

            if (request.ImageUrlsExit.Count() != 0)
            {
                // Xóa các BookImage không còn trong ExistingImageUrls
                var imagesToRemove = book.BookImages
                    .Where(img => !request.ImageUrlsExit.Contains(img.BookImageUrl))
                    .ToList();

                // xoá file vật lý và url
                foreach (var imgRemove in imagesToRemove)
                {
                    await _fileService.DeleteFile(imgRemove);
                    await _imageRepository.Delete(imgRemove);
                }
            }

            // Lưu ảnh mới, thêm vào BookImages
            if(Images.Count() != 0)
                foreach (var formFile in Images)
                {
                    var imageUrl = await _fileService.UpLoadFile(formFile);
                    book.BookImages.Add(new BookImage { BookImageUrl = imageUrl });
                }
            
            // Cập nhật lên repository/DbContext
            await _bookRespository.SaveChangesAsync();

            return new StatusResponse(true, "Cập nhật sách thành công");

        }
    }
}