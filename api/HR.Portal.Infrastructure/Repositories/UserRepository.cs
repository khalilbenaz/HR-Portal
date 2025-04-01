using HR.Portal.Core.Entities;
using HR.Portal.Core.Interfaces;
using HR.Portal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace HR.Portal.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .Include(u => u.Employee)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.Employee)
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User?> GetByIdWithEmployeeAsync(Guid id)
        {
            return await _context.Users
                .Include(u => u.Employee)
                .ThenInclude(e => e != null ? e.Department : null)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<User?> GetCurrentUserAsync()
        {
            // Cette méthode devrait normalement utiliser le contexte HTTP pour obtenir l'utilisateur actuel
            // Comme nous n'avons pas accès au contexte HTTP ici, cette implémentation est un placeholder
            // qui devra être complétée avec la logique appropriée pour récupérer l'utilisateur actuel
            // basée sur le token JWT ou autre mécanisme d'authentification utilisé
            throw new NotImplementedException("Cette méthode doit être implémentée avec la logique d'accès à l'utilisateur actuel");
        }
    }
}