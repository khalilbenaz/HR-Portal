-- Script d'initialisation de la base de données PostgreSQL pour HR Portal

-- Création de la base de données (à exécuter séparément si nécessaire)
-- CREATE DATABASE hr_portal;

-- Création des tables
CREATE TABLE IF NOT EXISTS "Users" (
    "Id" UUID PRIMARY KEY,
    "Username" VARCHAR(50) NOT NULL UNIQUE,
    "Email" VARCHAR(100) NOT NULL UNIQUE,
    "FirstName" VARCHAR(50) NOT NULL,
    "LastName" VARCHAR(50) NOT NULL,
    "Role" VARCHAR(20) NOT NULL,
    "Password" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Departments" (
    "Id" UUID PRIMARY KEY,
    "Name" VARCHAR(100) NOT NULL,
    "ManagerId" UUID NULL
);

CREATE TABLE IF NOT EXISTS "Employees" (
    "Id" UUID PRIMARY KEY,
    "UserId" UUID NOT NULL UNIQUE,
    "FirstName" VARCHAR(50) NOT NULL,
    "LastName" VARCHAR(50) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,
    "Phone" VARCHAR(20) NULL,
    "Position" VARCHAR(100) NOT NULL,
    "DepartmentId" UUID NOT NULL,
    "ManagerId" UUID NULL,
    "HireDate" TIMESTAMP NOT NULL,
    "Status" VARCHAR(20) NOT NULL,
    FOREIGN KEY ("UserId") REFERENCES "Users" ("Id"),
    FOREIGN KEY ("DepartmentId") REFERENCES "Departments" ("Id"),
    FOREIGN KEY ("ManagerId") REFERENCES "Employees" ("Id")
);

-- Ajouter la contrainte de clé étrangère pour le manager dans Departments
ALTER TABLE "Departments" ADD CONSTRAINT "FK_Departments_Employees_ManagerId"
    FOREIGN KEY ("ManagerId") REFERENCES "Employees" ("Id") ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS "LeaveRequests" (
    "Id" UUID PRIMARY KEY,
    "EmployeeId" UUID NOT NULL,
    "StartDate" TIMESTAMP NOT NULL,
    "EndDate" TIMESTAMP NOT NULL,
    "Type" VARCHAR(20) NOT NULL,
    "Status" VARCHAR(20) NOT NULL,
    "Reason" TEXT NULL,
    "CreatedAt" TIMESTAMP NOT NULL,
    "UpdatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id")
);

CREATE TABLE IF NOT EXISTS "LeaveNotifications" (
    "Id" UUID PRIMARY KEY,
    "LeaveRequestId" UUID NOT NULL,
    "RecipientId" UUID NOT NULL,
    "RecipientRole" VARCHAR(20) NOT NULL,
    "Read" BOOLEAN NOT NULL DEFAULT FALSE,
    "CreatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("LeaveRequestId") REFERENCES "LeaveRequests" ("Id")
);

CREATE TABLE IF NOT EXISTS "Activities" (
    "Id" UUID PRIMARY KEY,
    "Type" VARCHAR(50) NOT NULL,
    "Message" TEXT NOT NULL,
    "Date" TIMESTAMP NOT NULL,
    "UserId" UUID NOT NULL,
    FOREIGN KEY ("UserId") REFERENCES "Users" ("Id")
);

CREATE TABLE IF NOT EXISTS "Payslips" (
    "Id" UUID PRIMARY KEY,
    "EmployeeId" UUID NOT NULL,
    "Period" VARCHAR(20) NOT NULL,
    "IssueDate" TIMESTAMP NOT NULL,
    "GrossAmount" DECIMAL(10, 2) NOT NULL,
    "NetAmount" DECIMAL(10, 2) NOT NULL,
    "Currency" VARCHAR(3) NOT NULL,
    "Status" VARCHAR(20) NOT NULL,
    FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id")
);

CREATE TABLE IF NOT EXISTS "PayslipEarnings" (
    "Id" UUID PRIMARY KEY,
    "PayslipId" UUID NOT NULL,
    "Description" VARCHAR(100) NOT NULL,
    "Amount" DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY ("PayslipId") REFERENCES "Payslips" ("Id")
);

CREATE TABLE IF NOT EXISTS "PayslipDeductions" (
    "Id" UUID PRIMARY KEY,
    "PayslipId" UUID NOT NULL,
    "Description" VARCHAR(100) NOT NULL,
    "Amount" DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY ("PayslipId") REFERENCES "Payslips" ("Id")
);

CREATE TABLE IF NOT EXISTS "Reviews" (
    "Id" UUID PRIMARY KEY,
    "EmployeeId" UUID NOT NULL,
    "ReviewerId" UUID NOT NULL,
    "ReviewerName" VARCHAR(100) NOT NULL,
    "Period" VARCHAR(20) NOT NULL,
    "SubmissionDate" TIMESTAMP NOT NULL,
    "Score" INTEGER NOT NULL,
    "Strengths" TEXT NULL,
    "Improvements" TEXT NULL,
    "Status" VARCHAR(20) NOT NULL,
    FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id")
);

CREATE TABLE IF NOT EXISTS "Goals" (
    "Id" UUID PRIMARY KEY,
    "EmployeeId" UUID NOT NULL,
    "Title" VARCHAR(100) NOT NULL,
    "Description" TEXT NULL,
    "StartDate" TIMESTAMP NOT NULL,
    "TargetDate" TIMESTAMP NOT NULL,
    "CompletedDate" TIMESTAMP NULL,
    "Progress" INTEGER NOT NULL,
    "Status" VARCHAR(20) NOT NULL,
    FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id")
);

-- Insertion de données de test
-- Utilisateurs
INSERT INTO "Users" ("Id", "Username", "Email", "FirstName", "LastName", "Role", "Password")
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'admin', 'admin@hrportal.com', 'Admin', 'User', 'ADMIN', 'admin123'),
    ('22222222-2222-2222-2222-222222222222', 'hrmanager', 'hr@hrportal.com', 'HR', 'Manager', 'HR', 'hr123'),
    ('33333333-3333-3333-3333-333333333333', 'jsmith', 'john.smith@hrportal.com', 'John', 'Smith')