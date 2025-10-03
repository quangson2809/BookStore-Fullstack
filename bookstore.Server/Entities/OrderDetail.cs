namespace bookstore.Server.Entities
{
    public class OrderDetail
    {
        public int Quantity { get; set; }
        public decimal Total_Price { get; set; }
        public DateTime Create_Time { get; set; }

        public int OrdersId { get; set; }
        public  Order? Order { get; set; }

        public int BookId { get; set; }
        public  Book? Book { get; set; }
    }
}