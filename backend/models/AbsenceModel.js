const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Absence = sequelize.define('Absence', {
  absence_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  absence_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  isAbOk:{
    type: DataTypes.ENUM('attente','accepter','refuser'),
    allowNull: false
  }
}, {
  tableName: 'absences',
  timestamps: false
});

// Sync the model with the database and add test dat

module.exports = Absence; 