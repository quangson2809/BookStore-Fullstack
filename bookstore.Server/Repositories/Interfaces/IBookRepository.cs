using bookstore.Server.Entities;

namespace bookstore.Server.Repositories.Interfaces
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        Task<Book> GetByIdAsync(int bookId);
        Task UpdateAsync(Book book);
        Task Create(Book book);
        Task<IEnumerable<Book>> GetByFilter(int? categoryId,string? keyWord);
    }
}
