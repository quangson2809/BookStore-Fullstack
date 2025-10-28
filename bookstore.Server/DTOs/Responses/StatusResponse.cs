namespace bookstore.Server.DTOs.Responses
{
    public class StatusResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;

        public StatusResponse(Boolean status,  String message)
        {
            Success = status;
            Message = message;
        }

        public StatusResponse()
        {
        }
    }
}
