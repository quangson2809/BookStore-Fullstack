namespace bookstore.Server.Repositories
{
    public interface IGenericRepository<E> where E :  class
    {
        Task<E?> GetByIdAsync(int id);
        Task DeleteAsync(int id);

        Task<IEnumerable<E>> GetAllAsync();
        Task AddAsync(E entity);
        Task UpdateAsync(E entity);

    }
}
