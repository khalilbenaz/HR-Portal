using System;
using System.Collections.Generic;

namespace HR.Portal.Core.Entities
{
    public class Department
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Guid? ManagerId { get; set; }
        
        // Relations
        public Employee? Manager { get; set; }
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}