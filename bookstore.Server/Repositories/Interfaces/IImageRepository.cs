using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface IImageRepository : IGenericRepository<BookImage>
    {
        Task Delete(BookImage bookImage);
    }
}
