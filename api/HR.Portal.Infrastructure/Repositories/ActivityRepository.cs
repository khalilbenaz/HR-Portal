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
    public class ActivityRepository : Repository<Activity>, IActivityRepository
    {
        public ActivityRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Activity>> GetRecentActivitiesAsync(int limit)
        {
            return await _context.Activities
                .Include(a => a.User)
                .OrderByDescending(a => a.Date)
                .Take(limit)
                .ToListAsync();
        }
    }
}