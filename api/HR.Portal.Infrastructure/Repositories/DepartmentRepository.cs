using HR.Portal.Core.Entities;
using HR.Portal.Core.Interfaces;
using HR.Portal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.Portal.Infrastructure.Repositories
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Department>> GetAllWithEmployeeCountAsync()
        {
            return await _context.Departments
                .Include(d => d.Employees)
                .Select(d => new Department
                {
                    Id = d.Id,
                    Name = d.Name,
                    ManagerId = d.ManagerId,
                    Manager = d.Manager,
                    Employees = d.Employees
                })
                .ToListAsync();
        }

        public async Task<Department?> GetDepartmentWithEmployeesAsync(Guid id)
        {
            return await _context.Departments
                .Include(d => d.Employees)
                .Include(d => d.Manager)
                .FirstOrDefaultAsync(d => d.Id == id);
        }
    }
}