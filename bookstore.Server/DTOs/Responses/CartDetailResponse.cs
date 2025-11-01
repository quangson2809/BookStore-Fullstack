using bookstore.Server.Entities;
namespace bookstore.Server.DTOs.Responses
{
    public class CartDetailResponse
    {
        public int TotalPrice { get; set; } = 0;
        public List<BookCartOverviewResponse> Items { get; set; } = new List<BookCartOverviewResponse>();


    }
}
