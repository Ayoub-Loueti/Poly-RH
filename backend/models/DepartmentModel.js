const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  department_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  departement_type: {
    type: DataTypes.ENUM('Finance', 'HR', 'Sales', 'Marketing', 'Engineering'),
    allowNull: false
  }
}, {
  tableName: 'departments',
  timestamps: false
});

module.exports = Department;
