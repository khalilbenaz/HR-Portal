using HR.Portal.Core.Entities;
using System;
using System.Threading.Tasks;

namespace HR.Portal.Core.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetCurrentUserAsync();
    }
}