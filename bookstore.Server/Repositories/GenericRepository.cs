namespace bookstore.Server.Repositories;
using bookstore.Server.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class GenericRepository<E> : IGenericRepository<E> where E : class
{
    private readonly BookStoreDbContext _dbContext;
    protected readonly DbSet<E> _table;

    public GenericRepository(BookStoreDbContext dbContext) {
        _dbContext = dbContext;
        _table = _dbContext.Set<E>();
    }

    public async Task<E?> GetByIdAsync(int id)
    {
        return await _table.FindAsync(id);
    }

    public async Task DeleteAsync(int id)
    {
         await Task.CompletedTask;
    }

    public async Task<IEnumerable<E>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public async Task AddAsync(E entity)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(E entity)
    {
        throw new NotImplementedException();
    }
}

