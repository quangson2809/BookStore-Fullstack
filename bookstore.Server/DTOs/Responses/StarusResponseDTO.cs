namespace bookstore.Server.DTOs.Responses
{
    public class StarusResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;

        public StarusResponseDTO(Boolean status,  String message)
        {
            Success = status;
            Message = message;
        }
    }
}
