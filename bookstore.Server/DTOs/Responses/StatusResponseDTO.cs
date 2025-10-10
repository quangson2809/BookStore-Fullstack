namespace bookstore.Server.DTOs.Responses
{
    public class StatusResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;

        public StatusResponseDTO(Boolean status, String message)
        {
            Success = status;
            Message = message;
        }
    }
}
