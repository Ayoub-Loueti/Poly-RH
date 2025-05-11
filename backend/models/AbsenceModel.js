const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Absence = sequelize.define('Absence', {
  absence_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  employee_id: {
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
  }
}, {
  tableName: 'absences',
  timestamps: false
});

// Sync the model with the database and add test data
const initializeAbsences = async () => {
  try {
    await sequelize.sync();
    console.log('Absences table created successfully');

    // Check if we already have data
    const count = await Absence.count();
    if (count === 0) {
      // Add test data
      await Absence.bulkCreate([
        {
          employee_id: 1,
          start_date: new Date('2024-01-01'),
          end_date: new Date('2024-01-03'),
          absence_type: 'Sick Leave'
        },
        {
          employee_id: 2,
          start_date: new Date('2024-01-05'),
          end_date: new Date('2024-01-07'),
          absence_type: 'Vacation'
        },
        {
          employee_id: 3,
          start_date: new Date('2024-01-10'),
          end_date: new Date('2024-01-12'),
          absence_type: 'Sick Leave'
        },
        {
          employee_id: 4,
          start_date: new Date('2024-01-15'),
          end_date: new Date('2024-01-16'),
          absence_type: 'Personal Day'
        },
        {
          employee_id: 5,
          start_date: new Date('2024-01-20'),
          end_date: new Date('2024-01-25'),
          absence_type: 'Training'
        }
      ]);
      console.log('Test data added successfully');
    }
  } catch (error) {
    console.error('Error initializing absences:', error);
  }
};

initializeAbsences();

module.exports = Absence; 