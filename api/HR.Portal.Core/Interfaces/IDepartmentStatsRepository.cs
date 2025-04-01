using HR.Portal.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.Portal.Core.Interfaces
{
    public interface IDepartmentStatsRepository
    {
        Task<IEnumerable<DepartmentStats>> GetDepartmentStatsAsync();
    }
}