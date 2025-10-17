using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<StatusResponse> AdminLoginAsync(AdminLoginRequest request);
        Task<StatusResponse> CustomerLoginAsync(CustomerLoginRequest request);
        Task<StatusResponse> CustomerSignupAsync(CustomerSignupRequest request);

        Task<bool> IsAuthenticatedAsync();

    }
}
