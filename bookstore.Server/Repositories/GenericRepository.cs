namespace bookstore.Server.Repositories;

using bookstore.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class GenericRepository<E> : IGenericRepository<E> where E : class
{
    protected readonly BookStoreDbContext _dbContext;
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
          await _table
            .Where(e => EF.Property<int>(e, "Id") == id)
            .ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<E>> GetAllAsync()
    {
        return await _table.ToListAsync();
    }

    public async Task AddAsync(E entity)
    {
        await _table.AddAsync(entity);
    }

    public async Task UpdateAsync(E entity)
    {
        _table.Update(entity);
    }
}

