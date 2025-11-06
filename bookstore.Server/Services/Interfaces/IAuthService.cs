using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<StatusResponse> AdminLogin(AdminLoginRequest request);
        Task<CustomerLoginResponse> CustomerLogin(CustomerLoginRequest request);
        Task<StatusResponse> CustomerSignup(CustomerSignupRequest request);

        Task<StatusResponse> IsAuthenticatedAsync();

    }
}
