using System;

namespace HR.Portal.Core.Entities
{
    public class Review
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid ReviewerId { get; set; }
        public string ReviewerName { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public DateTime SubmissionDate { get; set; }
        public int Score { get; set; }
        public string Strengths { get; set; } = string.Empty;
        public string Improvements { get; set; } = string.Empty;
        public string Status { get; set; } = "PENDING"; // PENDING, IN_PROGRESS, COMPLETED
        
        // Relations
        public Employee Employee { get; set; } = null!;
    }

    public enum ReviewStatus
    {
        PENDING,
        IN_PROGRESS,
        COMPLETED
    }
}