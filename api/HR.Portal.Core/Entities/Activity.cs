using System;

namespace HR.Portal.Core.Entities
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = string.Empty; // EMPLOYEE_ADDED, EMPLOYEE_UPDATED, LEAVE_REQUESTED, LEAVE_APPROVED, LEAVE_REJECTED, PAYSLIP_GENERATED
        public string Message { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public Guid UserId { get; set; }
        
        // Relations
        public User User { get; set; } = null!;
    }

    public enum ActivityType
    {
        EMPLOYEE_ADDED,
        EMPLOYEE_UPDATED,
        LEAVE_REQUESTED,
        LEAVE_APPROVED,
        LEAVE_REJECTED,
        PAYSLIP_GENERATED
    }
}