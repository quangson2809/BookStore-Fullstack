using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface IImageRepoeitory : IGenericRepository<BookImage>
    {
        Task Delete(BookImage bookImage);
    }
}
