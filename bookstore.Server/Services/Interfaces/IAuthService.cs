using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request);
        Task<LoginResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request);
        Task<bool> IsAuthenticatedAsync();
    }
}
