const { DataTypes } = require('sequelize');

/**
 * Role model — merged from RH_EMP
 */
module.exports = (sequelize) => {
  return sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    permissions: { type: DataTypes.JSON, defaultValue: [] }
  });
};
