using System;

namespace HR.Portal.Core.Entities
{
    public class Goal
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime TargetDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public int Progress { get; set; } = 0;
        public string Status { get; set; } = "NOT_STARTED"; // NOT_STARTED, IN_PROGRESS, COMPLETED
        
        // Relations
        public Employee Employee { get; set; } = null!;
    }

    public enum GoalStatus
    {
        NOT_STARTED,
        IN_PROGRESS,
        COMPLETED
    }
}