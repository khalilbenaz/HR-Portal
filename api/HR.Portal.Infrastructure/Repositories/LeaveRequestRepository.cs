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
    public class LeaveRequestRepository : Repository<LeaveRequest>, ILeaveRequestRepository
    {
        public LeaveRequestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByEmployeeAsync(Guid employeeId)
        {
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .Include(l => l.Notifications)
                .Where(l => l.EmployeeId == employeeId)
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> GetPendingLeaveRequestsForManagerAsync(Guid managerId)
        {
            // Récupérer les employés gérés par ce manager
            var managedEmployeeIds = await _context.Employees
                .Where(e => e.ManagerId == managerId)
                .Select(e => e.Id)
                .ToListAsync();

            // Récupérer les demandes de congés en attente pour ces employés
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .ThenInclude(e => e.User)
                .Include(l => l.Notifications)
                .Where(l => managedEmployeeIds.Contains(l.EmployeeId) && l.Status == "PENDING")
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();
        }

        public async Task<LeaveRequest?> GetLeaveRequestWithDetailsAsync(Guid id)
        {
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .ThenInclude(e => e.User)
                .Include(l => l.Notifications)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<IEnumerable<LeaveRequest>> GetPendingLeaveRequestsAsync()
        {
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .ThenInclude(e => e.User)
                .Include(l => l.Notifications)
                .Where(l => l.Status == "PENDING")
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();
        }
    }
}