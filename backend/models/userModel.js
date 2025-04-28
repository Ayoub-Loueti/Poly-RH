const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING(200),
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
    type: DataTypes.ENUM('admin', 'employe'),
    allowNull: false
  }
}, {
  tableName: 'user', // Table name in your database
  timestamps: false, // Set to true if you have createdAt/updatedAt columns
});

module.exports = User;