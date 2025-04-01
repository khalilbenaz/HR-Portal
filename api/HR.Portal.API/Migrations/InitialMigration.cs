using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace HR.Portal.API.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Cette migration est vide car nous utilisons le script SQL init-db.sql pour initialiser la base de données
            // Cependant, nous pouvons exécuter ce script SQL directement ici
            migrationBuilder.Sql(System.IO.File.ReadAllText("init-db.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Suppression de toutes les tables dans l'ordre inverse de leur création
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Goals\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Reviews\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"PayslipDeductions\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"PayslipEarnings\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Payslips\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Activities\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"LeaveNotifications\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"LeaveRequests\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Employees\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Departments\" CASCADE;");
            migrationBuilder.Sql("DROP TABLE IF EXISTS \"Users\" CASCADE;");
        }
    }
}