using HR.Portal.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace HR.Portal.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<LeaveNotification> LeaveNotifications { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Payslip> Payslips { get; set; }
        public DbSet<PayslipEarning> PayslipEarnings { get; set; }
        public DbSet<PayslipDeduction> PayslipDeductions { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Goal> Goals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.Username).IsUnique();
            });

            // Department configuration
            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(d => d.Manager)
                      .WithMany()
                      .HasForeignKey(d => d.ManagerId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Employee configuration
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(e => e.User)
                      .WithOne(u => u.Employee)
                      .HasForeignKey<Employee>(e => e.UserId);
                entity.HasOne(e => e.Department)
                      .WithMany(d => d.Employees)
                      .HasForeignKey(e => e.DepartmentId);
                entity.HasOne(e => e.Manager)
                      .WithMany(m => m.ManagedEmployees)
                      .HasForeignKey(e => e.ManagerId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // LeaveRequest configuration
            modelBuilder.Entity<LeaveRequest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(l => l.Employee)
                      .WithMany(e => e.LeaveRequests)
                      .HasForeignKey(l => l.EmployeeId);
            });

            // LeaveNotification configuration
            modelBuilder.Entity<LeaveNotification>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(n => n.LeaveRequest)
                      .WithMany(l => l.Notifications)
                      .HasForeignKey(n => n.LeaveRequestId);
            });

            // Activity configuration
            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(a => a.User)
                      .WithMany()
                      .HasForeignKey(a => a.UserId);
            });

            // Payslip configuration
            modelBuilder.Entity<Payslip>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(p => p.Employee)
                      .WithMany(e => e.Payslips)
                      .HasForeignKey(p => p.EmployeeId);
            });

            // PayslipEarning configuration
            modelBuilder.Entity<PayslipEarning>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(pe => pe.Payslip)
                      .WithMany(p => p.Earnings)
                      .HasForeignKey(pe => pe.PayslipId);
            });

            // PayslipDeduction configuration
            modelBuilder.Entity<PayslipDeduction>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(pd => pd.Payslip)
                      .WithMany(p => p.Deductions)
                      .HasForeignKey(pd => pd.PayslipId);
            });

            // Review configuration
            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(r => r.Employee)
                      .WithMany(e => e.Reviews)
                      .HasForeignKey(r => r.EmployeeId);
            });

            // Goal configuration
            modelBuilder.Entity<Goal>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasOne(g => g.Employee)
                      .WithMany(e => e.Goals)
                      .HasForeignKey(g => g.EmployeeId);
            });
        }
    }
}