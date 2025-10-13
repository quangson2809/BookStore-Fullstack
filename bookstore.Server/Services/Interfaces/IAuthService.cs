using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<StatusResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request);
        Task<StatusResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request);
        Task<StatusResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request);
        Task<bool> IsAuthenticatedAsync();
    }
}
