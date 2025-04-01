using HR.Portal.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.Portal.Core.Interfaces
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        Task<Department?> GetDepartmentWithEmployeesAsync(Guid id);
        Task<IEnumerable<Department>> GetAllWithEmployeeCountAsync();
    }
}