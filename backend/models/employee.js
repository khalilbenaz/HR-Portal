const { DataTypes } = require('sequelize');

/**
 * Employee model — merged from RH_EMP
 * Covers: personal info, role, manager hierarchy
 */
module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telephone: { type: DataTypes.STRING },
    motDePasseHashed: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    responsableId: { type: DataTypes.INTEGER, allowNull: true },
    departement: { type: DataTypes.STRING },
    poste: { type: DataTypes.STRING },
    dateEmbauche: { type: DataTypes.DATE },
    salaire: { type: DataTypes.DECIMAL(10, 2) },
    status: { type: DataTypes.ENUM('Actif', 'Inactif', 'Congé'), defaultValue: 'Actif' }
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Role, { foreignKey: 'roleId' });
    Employee.belongsTo(Employee, { as: 'responsable', foreignKey: 'responsableId' });
    Employee.hasMany(models.Leave, { foreignKey: 'employeId' });
    Employee.hasMany(models.AdministrativeDocument, { foreignKey: 'employeId' });
  };

  return Employee;
};
