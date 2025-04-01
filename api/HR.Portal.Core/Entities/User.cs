using System;
using System.Collections.Generic;

namespace HR.Portal.Core.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // ADMIN, HR, MANAGER, EMPLOYEE
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        
        // Relations
        public Employee? Employee { get; set; }
    }

    public enum UserRole
    {
        ADMIN,
        HR,
        MANAGER,
        EMPLOYEE
    }
}