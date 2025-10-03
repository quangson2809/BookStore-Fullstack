namespace bookstore.Server.DTOs.Requests
{
    public class AdminLoginRequestDTO
    {
        public string Username { get; set; } = string.Empty;   // Viết hoa property cho chuẩn C#
        public string Password { get; set; } = string.Empty;
    }
}
