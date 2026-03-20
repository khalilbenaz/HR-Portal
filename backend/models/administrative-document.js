const { DataTypes } = require('sequelize');

/**
 * Administrative Document model — merged from RH_EMP
 * Types: Contrat, Attestation travail, Bulletin paie, CIN, etc.
 */
module.exports = (sequelize) => {
  const AdminDoc = sequelize.define('AdministrativeDocument', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employeId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('Contrat', 'Attestation', 'Bulletin', 'CIN', 'Diplôme', 'Autre'), allowNull: false },
    titre: { type: DataTypes.STRING, allowNull: false },
    fichierUrl: { type: DataTypes.STRING },
    dateCreation: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  AdminDoc.associate = (models) => {
    AdminDoc.belongsTo(models.Employee, { foreignKey: 'employeId' });
  };

  return AdminDoc;
};
