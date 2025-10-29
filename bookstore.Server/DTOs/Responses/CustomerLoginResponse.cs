namespace bookstore.Server.DTOs.Responses
{
    public class CustomerLoginResponse 
    {
        public int UserId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
        public int CartId { get; set; }
        public int OrderId { get; set; }
        public List<int> OrderIds { get; set; } = new List<int>();
        public bool Success { get; set; } = true;
    }
}
