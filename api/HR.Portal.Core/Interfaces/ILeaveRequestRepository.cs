using HR.Portal.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.Portal.Core.Interfaces
{
    public interface ILeaveRequestRepository : IRepository<LeaveRequest>
    {
        Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByEmployeeAsync(Guid employeeId);
        Task<LeaveRequest?> GetLeaveRequestWithDetailsAsync(Guid id);
        Task<IEnumerable<LeaveRequest>> GetPendingLeaveRequestsAsync();
        Task<IEnumerable<LeaveRequest>> GetPendingLeaveRequestsForManagerAsync(Guid managerId);
    }
}