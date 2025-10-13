using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<StarusResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request);
        Task<StarusResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request);
        Task<StarusResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request);
        Task<bool> IsAuthenticatedAsync();
    }
}
