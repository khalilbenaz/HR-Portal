using HR.Portal.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.Portal.Core.Interfaces
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<IEnumerable<Employee>> GetEmployeesByDepartmentAsync(Guid departmentId);
        Task<IEnumerable<Employee>> GetEmployeesByManagerAsync(Guid managerId);
        Task<Employee?> GetEmployeeWithDetailsAsync(Guid id);
    }
}