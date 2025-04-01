using HR.Portal.Core.Entities;
using HR.Portal.Core.Interfaces;
using HotChocolate;
using HotChocolate.Data;
using System;
using System.Threading.Tasks;

namespace HR.Portal.API.GraphQL.Mutations
{
    [GraphQLDescription("Mutations pour modifier les données de l'application")]
    public class Mutation
    {
        // Départements
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Crée un nouveau département")]
        public async Task<Department> CreateDepartment(
            string name,
            Guid? managerId,
            [Service] IDepartmentRepository departmentRepository)
        {
            var department = new Department
            {
                Id = Guid.NewGuid(),
                Name = name,
                ManagerId = managerId
            };

            await departmentRepository.AddAsync(department);
            return department;
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Met à jour un département existant")]
        public async Task<Department?> UpdateDepartment(
            Guid id,
            string? name,
            Guid? managerId,
            [Service] IDepartmentRepository departmentRepository)
        {
            var department = await departmentRepository.GetByIdAsync(id);
            if (department == null) return null;

            if (name != null) department.Name = name;
            if (managerId.HasValue) department.ManagerId = managerId;

            await departmentRepository.UpdateAsync(department);
            return department;
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Supprime un département")]
        public async Task<bool> DeleteDepartment(
            Guid id,
            [Service] IDepartmentRepository departmentRepository)
        {
            var department = await departmentRepository.GetByIdAsync(id);
            if (department == null) return false;

            await departmentRepository.DeleteAsync(id);
            return true;
        }

        // Employés
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Crée un nouvel employé")]
        public async Task<Employee> CreateEmployee(
            string firstName,
            string lastName,
            string email,
            string? phone,
            string position,
            Guid departmentId,
            Guid? managerId,
            DateTime hireDate,
            string status,
            [Service] IEmployeeRepository employeeRepository,
            [Service] IUserRepository userRepository)
        {
            // Créer un utilisateur associé
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = email.Split('@')[0],
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                Role = "EMPLOYEE",
                PasswordHash = "password123" // À remplacer par un mot de passe sécurisé
            };

            await userRepository.AddAsync(user);

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Phone = phone,
                Position = position,
                DepartmentId = departmentId,
                ManagerId = managerId,
                HireDate = hireDate,
                Status = status
            };

            await employeeRepository.AddAsync(employee);
            return employee;
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Met à jour un employé existant")]
        public async Task<Employee?> UpdateEmployee(
            Guid id,
            string? firstName,
            string? lastName,
            string? email,
            string? phone,
            string? position,
            Guid? departmentId,
            Guid? managerId,
            string? status,
            [Service] IEmployeeRepository employeeRepository)
        {
            var employee = await employeeRepository.GetByIdAsync(id);
            if (employee == null) return null;

            if (firstName != null) employee.FirstName = firstName;
            if (lastName != null) employee.LastName = lastName;
            if (email != null) employee.Email = email;
            if (phone != null) employee.Phone = phone;
            if (position != null) employee.Position = position;
            if (departmentId.HasValue) employee.DepartmentId = departmentId.Value;
            if (managerId.HasValue) employee.ManagerId = managerId;
            if (status != null) employee.Status = status;

            await employeeRepository.UpdateAsync(employee);
            return employee;
        }

        // Demandes de congés
        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Crée une nouvelle demande de congés")]
        public async Task<LeaveRequest> CreateLeaveRequest(
            Guid employeeId,
            DateTime startDate,
            DateTime endDate,
            string type,
            string? reason,
            [Service] ILeaveRequestRepository leaveRequestRepository,
            [Service] IActivityRepository activityRepository,
            [Service] IEmployeeRepository employeeRepository)
        {
            var employee = await employeeRepository.GetByIdAsync(employeeId);
            if (employee == null) throw new ArgumentException("Employé non trouvé");

            var leaveRequest = new LeaveRequest
            {
                Id = Guid.NewGuid(),
                EmployeeId = employeeId,
                StartDate = startDate,
                EndDate = endDate,
                Type = type,
                Status = "PENDING",
                Reason = reason,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await leaveRequestRepository.AddAsync(leaveRequest);

            // Enregistrer l'activité
            var activity = new Activity
            {
                Id = Guid.NewGuid(),
                Type = "LEAVE_REQUEST",
                Message = $"{employee.FirstName} {employee.LastName} a demandé un congé du {startDate.ToShortDateString()} au {endDate.ToShortDateString()}",
                Date = DateTime.UtcNow,
                UserId = employee.UserId
            };

            await activityRepository.AddAsync(activity);

            return leaveRequest;
        }

        [UseDbContext(typeof(HR.Portal.Infrastructure.Data.ApplicationDbContext))]
        [GraphQLDescription("Met à jour le statut d'une demande de congés")]
        public async Task<LeaveRequest?> UpdateLeaveRequestStatus(
            Guid id,
            string status,
            [Service] ILeaveRequestRepository leaveRequestRepository,
            [Service] IActivityRepository activityRepository,
            [Service] IEmployeeRepository employeeRepository)
        {
            var leaveRequest = await leaveRequestRepository.GetLeaveRequestWithDetailsAsync(id);
            if (leaveRequest == null) return null;

            var oldStatus = leaveRequest.Status;
            leaveRequest.Status = status;
            leaveRequest.UpdatedAt = DateTime.UtcNow;

            await leaveRequestRepository.UpdateAsync(leaveRequest);

            // Enregistrer l'activité
            var employee = await employeeRepository.GetByIdAsync(leaveRequest.EmployeeId);
            if (employee != null)
            {
                var activity = new Activity
                {
                    Id = Guid.NewGuid(),
                    Type = "LEAVE_REQUEST_STATUS",
                    Message = $"La demande de congé de {employee.FirstName} {employee.LastName} a été {(status == "APPROVED" ? "approuvée" : status == "REJECTED" ? "rejetée" : "mise à jour")}",
                    Date = DateTime.UtcNow,
                    UserId = employee.UserId
                };

                await activityRepository.AddAsync(activity);
            }

            return leaveRequest;
        }
    }
}