using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;

namespace bookstore.Server.Services.Interfaces
{
    public interface IAuthService
    {
<<<<<<< HEAD
        Task<StatusResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request);
        Task<StatusResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request);
        Task<StatusResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request);
=======
        Task<StarusResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request);
        Task<StarusResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request);
        Task<StarusResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request);
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
        Task<bool> IsAuthenticatedAsync();
    }
}
