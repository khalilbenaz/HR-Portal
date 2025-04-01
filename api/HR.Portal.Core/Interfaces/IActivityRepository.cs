using HR.Portal.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR.Portal.Core.Interfaces
{
    public interface IActivityRepository : IRepository<Activity>
    {
        Task<IEnumerable<Activity>> GetRecentActivitiesAsync(int limit);
    }
}