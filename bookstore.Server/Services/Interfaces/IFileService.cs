using bookstore.Server.Entities;

namespace bookstore.Server.Services.Interfaces
{
    public interface IFileService 
    {
        Task <String>UpLoadFile(IFormFile File);
        Task DeleteFile(BookImage bookImage);
    }
}
