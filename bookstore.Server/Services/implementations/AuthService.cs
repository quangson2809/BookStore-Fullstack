using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using bookstore.Server.Repositories;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Implementations;
using bookstore.Server.Repositories.Interfaces;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using bookstore.Server.SessionCookies;

namespace bookstore.Server.Services.Implementations

{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly AuthenticationCookie _authenticationCookie;
        private readonly ISessionManager _sessionManager;
        public AuthService(IUserRepository  userRepository,AuthenticationCookie authenticationCookie,ISessionManager sessionManager)
        {
            _userRepository = userRepository;
            _authenticationCookie = authenticationCookie;
            _sessionManager = sessionManager;
        }

        public async Task<LoginResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request)
        {   
            
            // Giả lập: chỉ cho phép "Admin" / "adminpass"
            User user = await _userRepository.GetByFirstName(request.Username);
            if (user == null)
            {
                return new LoginResponseDTO
                {
                    Success = false,
                    Token = string.Empty,
                    Message = "Tên đăng nhập hoặc mật khẩu không chính xác"
                };
            }
            if ( request.Password == user.PasswordHash)
            {
                return new LoginResponseDTO
                {
                    Success = true,
                    Token = "mock-jwt-token",
                    Message = "Đăng nhập thành công"
                };
            }

            return new LoginResponseDTO
            {
                Success = false,
                Token = string.Empty,
                Message = "Tên đăng nhập hoặc mật khẩu không chính xác"
            };
        }
        public async Task <LoginResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request)
        {
                return new LoginResponseDTO
                {
                    Success = false,
                    Token = string.Empty,
                    Message = "Chức năng chưa được triển khai"
                };
        }
        public Task<bool> IsAuthenticatedAsync()
        {
            // Giả lập authentication, thực tế sẽ check JWT hoặc session
            return Task.FromResult(true);
        }
    }
}
