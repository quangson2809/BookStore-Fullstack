namespace bookstore.Server.DTOs.Responses
{
    public class CustomerLoginResponse 
    {
        public int UserId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
        
        public bool Success { get; set; } = true;
    }
}
