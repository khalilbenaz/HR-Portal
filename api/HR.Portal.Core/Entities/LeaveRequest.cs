using System;
using System.Collections.Generic;

namespace HR.Portal.Core.Entities
{
    public class LeaveRequest
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Type { get; set; } = string.Empty; // SICK, ANNUAL, MATERNITY, PATERNITY, OTHER
        public string Status { get; set; } = "PENDING"; // PENDING, APPROVED, REJECTED
        public string Reason { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Relations
        public Employee Employee { get; set; } = null!;
        public ICollection<LeaveNotification> Notifications { get; set; } = new List<LeaveNotification>();
    }

    public enum LeaveType
    {
        SICK,
        ANNUAL,
        MATERNITY,
        PATERNITY,
        OTHER
    }

    public enum LeaveStatus
    {
        PENDING,
        APPROVED,
        REJECTED
    }
}