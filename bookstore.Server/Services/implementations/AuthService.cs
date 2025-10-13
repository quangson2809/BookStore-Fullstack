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

<<<<<<< HEAD
        public async Task<StatusResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request)
=======
        public async Task<StarusResponseDTO> AdminLoginAsync(AdminLoginRequestDTO request)
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
        {   
            
            // Giả lập: chỉ cho phép "Admin" / "adminpass"
            User user = await _userRepository.GetByFirstName(request.Username);
            if (user == null)
            {
<<<<<<< HEAD
                return new StatusResponseDTO(false, "Tên đăng nhập hoặc mật khẩu không dúng");
=======
                return new StarusResponseDTO(false, "Tên đăng nhập hoặc mật khẩu không dúng");
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
            }

            if ( request.Password == user.PasswordHash)
            {
                // Lưu thông tin đăng nhập vào session
                await _sessionManager.Set(user);
                // Thiết lập cookie authentication
                await _authCookieManager.Set(user);
<<<<<<< HEAD
                return new StatusResponseDTO(true, "Đăng nhập thành công");
            }

            return new StatusResponseDTO(false, "Tên đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task <StatusResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request)
=======
                return new StarusResponseDTO(true, "Đăng nhập thành công");
            }

            return new StarusResponseDTO(false, "Tên đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task <StarusResponseDTO> CustomerLoginAsync(CustomerLoginRequestDTO request)
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
        {
            User user = await _userRepository.GetByPhone(request.PhoneNumber);
            if (user == null)
            {
<<<<<<< HEAD
                return new StatusResponseDTO(false, "SĐT đăng nhập hoặc mật khẩu không dúng");
=======
                return new StarusResponseDTO(false, "SĐT đăng nhập hoặc mật khẩu không dúng");
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
            }

            if (request.Password == user.PasswordHash)
            {
                // Lưu thông tin đăng nhập vào session
                await _sessionManager.Set(user);
                // Thiết lập cookie authentication
                await _authCookieManager.Set(user);
<<<<<<< HEAD
                return new StatusResponseDTO(true, "Đăng nhập thành công");
            }

            return new StatusResponseDTO(false, "SĐT đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task<StatusResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request) {
            User temp = await _userRepository.GetByPhone(request.PhoneNumber);
            if (temp != null )
            {
                return new StatusResponseDTO(false, "Sdt đã tồn tại");
=======
                return new StarusResponseDTO(true, "Đăng nhập thành công");
            }

            return new StarusResponseDTO(false, "SĐT đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task<StarusResponseDTO> CustomerSignupAsync(CustomerSignupRequestDTO request) {
            User temp = await _userRepository.GetByPhone(request.PhoneNumber);
            if (temp != null )
            {
                return new StarusResponseDTO(false, "Sdt đã tồn tại");
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
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

<<<<<<< HEAD
            return new StatusResponseDTO(true, "đăng ký thành công");
=======
            return new StarusResponseDTO(true, "đăng ký thành công");
>>>>>>> 156f8e592a3358334cc0340d59054de2fee9e9dc
        }

        public Task<bool> IsAuthenticatedAsync()
        {
            // Giả lập authentication, thực tế sẽ check JWT hoặc session
            return Task.FromResult(true);
        }
    }
}
