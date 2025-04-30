const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hire_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'employees',
  timestamps: false
});

module.exports = Employee; 