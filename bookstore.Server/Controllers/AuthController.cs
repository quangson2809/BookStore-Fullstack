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
            var response = await _authService.AdminLoginAsync(request);
            return Ok(response);
        }

        [HttpPost("customer/login")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerLoginRequest request)
        {
            var response = await _authService.CustomerLoginAsync(request);
            return Ok(response);
        }

        [HttpPost("customer/signup")]
        public async Task<IActionResult> CustomerSignup([FromBody] CustomerSignupRequestDTO request)
        {
            var response = _authService.CustomerSignupAsync(request);
            return Ok();
        }

        [Authorize(Roles ="Admin")]
        [HttpPost("admin/dashboard")]
        public async Task<IActionResult> AccessDashboad()
        {
            return Ok(new StatusResponse(true, " "));
        }


    }
}
