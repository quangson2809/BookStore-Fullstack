namespace bookstore.Server.DTOs.Requests
{
    public class CustomerSignupRequest
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }
        public String Password { get; set; }
        public String Address { get; set; }
        public String Email { get; set; }

    }
}
