const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email_user: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true // Ensures email is unique
  },
  motDePasse: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'employe','Rh'),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  hire_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'departments', // table name
      key: 'id_departement' // primary key in departments
    }
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  genre_employee: {
    type: DataTypes.ENUM('homme', 'femme'),
    allowNull: false
  },
  isValid: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'user', // Table name in your database
  timestamps: false, // Set to true if you have createdAt/updatedAt columns
});

module.exports = User;