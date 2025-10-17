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
        // Implement book-related methods here
        public async Task<StatusResponse> DeleteBook(int Id)
        {
            throw new NotImplementedException();
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

        public async Task<BookDetailResponse> GetBookDetail(int Id)
        {
            throw new NotImplementedException("chưa được thực thi");

        }
    }
}