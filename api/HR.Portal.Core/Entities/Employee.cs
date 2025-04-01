using System;
using System.Collections.Generic;

namespace HR.Portal.Core.Entities
{
    public class Employee
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public Guid DepartmentId { get; set; }
        public Guid? ManagerId { get; set; }
        public DateTime HireDate { get; set; }
        public string Status { get; set; } = "ACTIVE"; // ACTIVE, ON_LEAVE, TERMINATED
        public string? Avatar { get; set; }
        
        // Relations
        public User User { get; set; } = null!;
        public Department Department { get; set; } = null!;
        public Employee? Manager { get; set; }
        public ICollection<Employee> ManagedEmployees { get; set; } = new List<Employee>();
        public ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
        public ICollection<Payslip> Payslips { get; set; } = new List<Payslip>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    }

    public enum EmployeeStatus
    {
        ACTIVE,
        ON_LEAVE,
        TERMINATED
    }
}