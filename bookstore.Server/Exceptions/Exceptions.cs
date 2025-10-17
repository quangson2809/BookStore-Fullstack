namespace bookstore.Server.Exceptions
{
    public class NotFoundException : Exception
    {
       public NotFoundException(string message) : base(message) { }
    }

    public class NotImplementedException : Exception
    {
        public NotImplementedException(string message) : base(message) { }
    }
}
