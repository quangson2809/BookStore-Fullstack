using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Services.Interfaces
{
    public interface IBookService
    {
        // Define book-related methods here
        Task<StatusResponse> AddBook(BookAddRequest request, List<IFormFile> Images);
        Task<StatusResponse> DeleteBook(int bookId);
        Task<BookDetailResponse> GetBookDetail(int bookId);
        Task<IEnumerable<BookHomeOverviewResponse>> GetAllBook();
        Task<StatusResponse> UpdateBook(int BookId,BookUpdateRequest request, List<IFormFile> Images);
    }
}