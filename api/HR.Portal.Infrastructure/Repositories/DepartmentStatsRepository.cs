using HR.Portal.Core.Entities;
using HR.Portal.Core.Interfaces;
using HR.Portal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.Portal.Infrastructure.Repositories
{
    public class DepartmentStatsRepository : IDepartmentStatsRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentStatsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DepartmentStats>> GetDepartmentStatsAsync()
        {
            // Récupérer les départements avec le nombre d'employés pour chacun
            var departmentStats = await _context.Departments
                .Select(d => new DepartmentStats
                {
                    Name = d.Name,
                    EmployeeCount = d.Employees.Count
                })
                .ToListAsync();

            return departmentStats;
        }
    }
}