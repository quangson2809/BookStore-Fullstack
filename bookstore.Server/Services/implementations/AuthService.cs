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
        private readonly SessionManager _sessionManager;
        private readonly AuthenticationCookieManager _authCookieManager;
        public AuthService(IUserRepository  userRepository,SessionManager sessionManager,AuthenticationCookieManager authCookieManager)
        {
            _userRepository = userRepository;
            _sessionManager = sessionManager;
            _authCookieManager = authCookieManager;
        }

        public async Task<LoginResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request)
        {   
            
            // Giả lập: chỉ cho phép "Admin" / "adminpass"
            User user = await _userRepository.GetByFirstName(request.Username);
            if (user == null)
            {
                return new LoginResponseDTO(false, "Tên đăng nhập hoặc mật khẩu không dúng");
            }

            if ( request.Password == user.PasswordHash)
            {
                // Lưu thông tin đăng nhập vào session
                await _sessionManager.Set(user);
                // Thiết lập cookie authentication
                await _authCookieManager.Set(user);
                return new LoginResponseDTO(true, "Đăng nhập thành công");
            }

            return new LoginResponseDTO(false, "Tên đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task <LoginResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request)
        {
            User user = await _userRepository.GetByPhone(request.PhoneNumber);
            if (user == null)
            {
                return new LoginResponseDTO(false, "SĐT đăng nhập hoặc mật khẩu không dúng");
            }

            if (request.Password == user.PasswordHash)
            {
                // Lưu thông tin đăng nhập vào session
                await _sessionManager.Set(user);
                // Thiết lập cookie authentication
                await _authCookieManager.Set(user);
                return new LoginResponseDTO(true, "Đăng nhập thành công");
            }

            return new LoginResponseDTO(false, "SĐT đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task<SignupResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request) {
            User temp = await _userRepository.GetByPhone(request.PhoneNumber);
            if (temp != null )
            {
                return new SignupResponseDTO(false, "Sdt đã tồn tại");
            }

            User u = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.PhoneNumber,
                PasswordHash=request.Password,
                Address=request.Address,
                RoleId=1
            };
            await _userRepository.AddAsync(u);

            User user = await _userRepository.GetByPhone(request.PhoneNumber);
            await _authCookieManager.Set(user);
            await _sessionManager.Set(user);

            return new SignupResponseDTO(true, "đăng ký thành công");
        }

        public Task<bool> IsAuthenticatedAsync()
        {
            // Giả lập authentication, thực tế sẽ check JWT hoặc session
            return Task.FromResult(true);
        }
    }
}
