using bookstore.Server.DTOs.Requests;
using bookstore.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace bookstore.Server.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authAdminService;

        public AuthController(IAuthService authAdminService)
        {
            _authAdminService = authAdminService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginRequestDTO request)
        {
            var response = await _authAdminService.AdminLoginAsync(request);
            return Ok(response);
        }
    }
}
