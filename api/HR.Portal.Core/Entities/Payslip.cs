using System;
using System.Collections.Generic;

namespace HR.Portal.Core.Entities
{
    public class Payslip
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string Period { get; set; } = string.Empty;
        public DateTime IssueDate { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public string Currency { get; set; } = "EUR";
        public string Status { get; set; } = "DRAFT"; // DRAFT, ISSUED, PAID
        
        // Relations
        public Employee Employee { get; set; } = null!;
        public ICollection<PayslipEarning> Earnings { get; set; } = new List<PayslipEarning>();
        public ICollection<PayslipDeduction> Deductions { get; set; } = new List<PayslipDeduction>();
    }

    public enum PayslipStatus
    {
        DRAFT,
        ISSUED,
        PAID
    }

    public class PayslipEarning
    {
        public Guid Id { get; set; }
        public Guid PayslipId { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        
        // Relations
        public Payslip Payslip { get; set; } = null!;
    }

    public class PayslipDeduction
    {
        public Guid Id { get; set; }
        public Guid PayslipId { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        
        // Relations
        public Payslip Payslip { get; set; } = null!;
    }
}