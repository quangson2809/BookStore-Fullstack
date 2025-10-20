using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Services.Interfaces
{
    public interface IBookService
    {
        // Define book-related methods here
        Task<StatusResponse> DeleteBook(int Id);
        Task<BookDetailResponse> GetBookDetail(int Id);
        Task<IEnumerable<BookHomeOverviewResponse>> GetAllBook();
        Task<StatusResponse> AddBook(AddBookRequest request);
        

    }
}