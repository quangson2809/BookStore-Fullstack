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
using bookstore.Server.Data;

namespace bookstore.Server.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly SessionManager _sessionManager;
        private readonly AuthenticationCookieManager _authCookieManager;
        private readonly ICartService _cartService;

        public AuthService(IUserRepository  userRepository,SessionManager sessionManager,AuthenticationCookieManager authCookieManager,ICartService cartService)
        {
            _userRepository = userRepository;
            _sessionManager = sessionManager;
            _authCookieManager = authCookieManager;
            _cartService = cartService;
        }

        public async Task<StatusResponse> AdminLogin(AdminLoginRequest request)

        {   
            // Giả lập: chỉ cho phép "Admin" / "adminpass"
            User user = await _userRepository.GetByFirstName(request.UserName);
            if (user == null)
            {
                return new StatusResponse(false, "Tên đăng nhập hoặc mật khẩu không dúng");
            }

            if ( request.Password == user.PasswordHash)
            {
                // Lưu thông tin đăng nhập vào session
                await _sessionManager.Set(user);
                // Thiết lập cookie authentication
                await _authCookieManager.Set(user);
                //
                //int userId = _sessionManager.GetUserId();
                await _authCookieManager.Get();

                return new StatusResponse(true, "Đăng nhập thành công");
            }

            return new StatusResponse(false, "Tên đăng nhập hoặc mật khẩu không dúng");
        }
        public async Task <CustomerLoginResponse> CustomerLogin(CustomerLoginRequest request)    
        {
            User user = await _userRepository.GetByPhone(request.PhoneNumber);
            if (user == null)
            {
                throw new Exception("SĐT đăng nhập hoặc mật khẩu không dúng");
            }

            if (request.Password == user.PasswordHash)
            {
                // Lưu thông tin đăng nhập vào session
                await _sessionManager.Set(user);
                // Thiết lập cookie authentication
                await _authCookieManager.Set(user);
                //
                int userId = _sessionManager.GetUserId();
                CustomerLoginResponse response = new CustomerLoginResponse()
                {
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Phone = user.Phone,
                    CartId = user.Carts.Any<Cart>() ? user.Carts.First<Cart>().CartId : 0,
                };
                user.Orders.ToList().ForEach(o => response.OrderIds.Add(o.OrderId));
                return response;
            }

            throw new Exception("SĐT đăng nhập hoặc mật khẩu không dúng");
        }

        public async Task<StatusResponse> CustomerSignup(CustomerSignupRequest request) {
            if (await _userRepository.GetByPhone(request.PhoneNumber) != null )
            {
                throw new Exception("SĐT đã được đăng ký");
            }
            if(await _userRepository.GetByEmail(request.Email) != null)
            {
                throw new Exception("Email đã được đăng ký");

            }
            User u = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.PhoneNumber,
                PasswordHash=request.Password,
                RoleId=2
            };
            Cart cart = new Cart
            {
                User = u
            };
            await _cartService.CreateCartForUser(cart);
            await _userRepository.AddAsync(u);
            await _userRepository.SaveChangesAsync();
            //u được Ef gán id sau khi save changes
            //await _authCookieManager.Set(u);
            //await _sessionManager.Set(u);

            return new StatusResponse()
            {
                Success = true,
                Message = "Đăng ký thành công"
            };

        }

        

        public async Task<StatusResponse> IsAuthenticatedAsync()
        {
            // Giả lập authentication, thực tế sẽ check JWT hoặc session
            _authCookieManager.Clear();
            _sessionManager.Clear();
            return new StatusResponse
            {
                Success = true,
                Message = "Đã đăng xuất"
            };
        }
    }
}
