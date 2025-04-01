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
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByDepartmentAsync(Guid departmentId)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.User)
                .Include(e => e.Manager)
                .Where(e => e.DepartmentId == departmentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByManagerAsync(Guid managerId)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.User)
                .Where(e => e.ManagerId == managerId)
                .ToListAsync();
        }

        public async Task<Employee?> GetEmployeeWithDetailsAsync(Guid id)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.User)
                .Include(e => e.Manager)
                .Include(e => e.LeaveRequests)
                .Include(e => e.Payslips)
                .Include(e => e.Reviews)
                .Include(e => e.Goals)
                .FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}