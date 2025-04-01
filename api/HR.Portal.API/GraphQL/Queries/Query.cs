using HR.Portal.Core.Entities;
using HR.Portal.Core.Interfaces;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.Portal.API.GraphQL.Queries
{
    [GraphQLDescription("Requêtes pour récupérer les données de l'application")]
    public class Query
    {
        // Utilisateurs
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère l'utilisateur actuellement connecté")]
        public async Task<User?> Me(
            [Service] IUserRepository userRepository,
            [Service] IHttpContextAccessor httpContextAccessor)
        {
            var userId = httpContextAccessor.HttpContext?.User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var id))
            {
                return null;
            }

            return await userRepository.GetByIdAsync(id);
        }

        // Départements
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        [GraphQLDescription("Récupère tous les départements")]
        public async Task<IEnumerable<Department>> Departments([Service] IDepartmentRepository departmentRepository)
        {
            return await departmentRepository.GetAllWithEmployeeCountAsync();
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère un département par son ID")]
        public async Task<Department?> Department(Guid id, [Service] IDepartmentRepository departmentRepository)
        {
            return await departmentRepository.GetDepartmentWithEmployeesAsync(id);
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère les statistiques des départements")]
        public async Task<IEnumerable<DepartmentStats>> DepartmentStats([Service] IDepartmentStatsRepository departmentStatsRepository)
        {
            return await departmentStatsRepository.GetDepartmentStatsAsync();
        }

        // Employés
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        [GraphQLDescription("Récupère tous les employés")]
        public async Task<IEnumerable<Employee>> Employees([Service] IEmployeeRepository employeeRepository)
        {
            return await employeeRepository.GetAllAsync();
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère un employé par son ID")]
        public async Task<Employee?> Employee(Guid id, [Service] IEmployeeRepository employeeRepository)
        {
            return await employeeRepository.GetEmployeeWithDetailsAsync(id);
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère les employés d'un département")]
        public async Task<IEnumerable<Employee>> EmployeesByDepartment(Guid departmentId, [Service] IEmployeeRepository employeeRepository)
        {
            return await employeeRepository.GetEmployeesByDepartmentAsync(departmentId);
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère les employés gérés par un manager")]
        public async Task<IEnumerable<Employee>> EmployeesByManager(Guid managerId, [Service] IEmployeeRepository employeeRepository)
        {
            return await employeeRepository.GetEmployeesByManagerAsync(managerId);
        }

        // Demandes de congés
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        [GraphQLDescription("Récupère toutes les demandes de congés")]
        public async Task<IEnumerable<LeaveRequest>> LeaveRequests([Service] ILeaveRequestRepository leaveRequestRepository)
        {
            return await leaveRequestRepository.GetAllAsync();
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère une demande de congés par son ID")]
        public async Task<LeaveRequest?> LeaveRequest(Guid id, [Service] ILeaveRequestRepository leaveRequestRepository)
        {
            return await leaveRequestRepository.GetLeaveRequestWithDetailsAsync(id);
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère les demandes de congés d'un employé")]
        public async Task<IEnumerable<LeaveRequest>> LeaveRequestsByEmployee(Guid employeeId, [Service] ILeaveRequestRepository leaveRequestRepository)
        {
            return await leaveRequestRepository.GetLeaveRequestsByEmployeeAsync(employeeId);
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Récupère les demandes de congés en attente pour un manager")]
        public async Task<IEnumerable<LeaveRequest>> PendingLeaveRequestsForManager(Guid managerId, [Service] ILeaveRequestRepository leaveRequestRepository)
        {
            return await leaveRequestRepository.GetPendingLeaveRequestsForManagerAsync(managerId);
        }

        // Activités récentes
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        [GraphQLDescription("Récupère les activités récentes")]
        public async Task<IEnumerable<Activity>> RecentActivities([Service] IActivityRepository activityRepository, int limit = 10)
        {
            var activities = await activityRepository.GetAllAsync();
            return activities.OrderByDescending(a => a.Date).Take(limit);
        }
    }
}