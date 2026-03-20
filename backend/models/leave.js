const { DataTypes } = require('sequelize');

/**
 * Leave model — merged from RH_EMP
 * Types: Congé annuel, Maladie, Maternité, Sans solde, Exceptionnel
 */
module.exports = (sequelize) => {
  const Leave = sequelize.define('Leave', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employeId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('Annuel', 'Maladie', 'Maternité', 'Sans solde', 'Exceptionnel'), allowNull: false },
    dateDebut: { type: DataTypes.DATE, allowNull: false },
    dateFin: { type: DataTypes.DATE, allowNull: false },
    motif: { type: DataTypes.TEXT },
    statut: { type: DataTypes.ENUM('En attente', 'Approuvé', 'Refusé', 'Annulé'), defaultValue: 'En attente' },
    attestationMedicaleUrl: { type: DataTypes.STRING },
    approuveParId: { type: DataTypes.INTEGER }
  });

  Leave.associate = (models) => {
    Leave.belongsTo(models.Employee, { foreignKey: 'employeId' });
  };

  return Leave;
};
