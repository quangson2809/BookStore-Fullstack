using bookstore.Server.DTOs.Requests;
using bookstore.Server.DTOs.Responses;
using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authAdminService)
        {
            _authService = authAdminService;
        }

        [HttpPost("admin/login")]
        public async Task<IActionResult> AdminLogin([FromBody] AdminLoginRequest request)
        {
            var response = await _authService.AdminLogin(request);
            return Ok(response);
        }

        [HttpPost("customer/login")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerLoginRequest request)
        {
            try
            {
                var response = await _authService.CustomerLogin(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }

        [HttpPost("customer/signup")]
        public async Task<IActionResult> CustomerSignup([FromBody] CustomerSignupRequest request)
        {
            try
            {
                var response = await _authService.CustomerSignup(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(new StatusResponse(false, ex.Message));
            }
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("admin/dashboard")]
        public async Task<IActionResult> AccessDashboad()
        {
            Console.WriteLine("==========================Accessing admin dashboard");
            return Ok(new {success = true});
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // In a real application, you might want to handle token invalidation or session termination here.
            var response = await _authService.IsAuthenticatedAsync();
            return Ok(response);

        }
    }
}
