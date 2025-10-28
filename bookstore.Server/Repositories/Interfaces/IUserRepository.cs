using bookstore.Server.Entities;
namespace bookstore.Server.Repositories.Interfaces
{
    public interface IUserRepository: IGenericRepository<User>
    {
        public Task<User?> GetByFirstName(string firstName);
        public  Task<User?> GetByPhone(string phone);
        public Task<User?> GetByEmail(string email);



    }
}
