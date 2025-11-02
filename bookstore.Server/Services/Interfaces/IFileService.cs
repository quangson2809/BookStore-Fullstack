namespace bookstore.Server.Services.Interfaces
{
    public interface IFileService 
    {
        Task <String>UpLoadFile(IFormFile File);
    }
}
