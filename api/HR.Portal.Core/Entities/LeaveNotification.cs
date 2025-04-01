using System;

namespace HR.Portal.Core.Entities
{
    public class LeaveNotification
    {
        public Guid Id { get; set; }
        public Guid LeaveRequestId { get; set; }
        public Guid RecipientId { get; set; }
        public string RecipientRole { get; set; } = string.Empty; // MANAGER, HR
        public bool Read { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Relations
        public LeaveRequest LeaveRequest { get; set; } = null!;
    }

    public enum RecipientRole
    {
        MANAGER,
        HR
    }
}