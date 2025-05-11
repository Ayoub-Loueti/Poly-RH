const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Employee = require('../models/employeeModel');
const Department = require('../models/DepartmentModel');

// Debug middleware for dashboard routes
router.use((req, res, next) => {
  console.log(`[Dashboard Routes] ${req.method} ${req.url}`);
  next();
});

// Get department statistics
router.get('/depStats', async (req, res) => {
  try {
    console.log('[Dashboard Routes] Fetching department statistics...');
    const departmentStats = await Department.findAll({
      attributes: [
        'department_name',
        [Sequelize.fn('COUNT', Sequelize.col('employees.employee_id')), 'employee_count']
      ],
      include: [{
        model: Employee,
        attributes: []
      }],
      group: ['department_name'],
      raw: true
    });

    console.log('[Dashboard Routes] Department statistics found:', departmentStats);
    res.json(departmentStats);
  } catch (error) {
    console.error('[Dashboard Routes] Error fetching department statistics:', error);
    res.status(500).json({ 
      message: 'Server error while fetching department statistics',
      error: error.message 
    });
  }
});

// Get age distribution
router.get('/ageDistribution', async (req, res) => {
  try {
    console.log('[Dashboard Routes] Fetching age distribution...');
    const ageDistribution = await Employee.findAll({
      attributes: [
        [Sequelize.fn('FLOOR', 
          Sequelize.fn('TIMESTAMPDIFF', 
            Sequelize.literal('YEAR'), 
            Sequelize.col('birth_date'), 
            Sequelize.fn('CURDATE')
          )
        ), 'age_group'],
        [Sequelize.fn('COUNT', Sequelize.col('employee_id')), 'count']
      ],
      group: ['age_group'],
      order: [['age_group', 'ASC']],
      raw: true
    });

    // Format age groups
    const formattedDistribution = ageDistribution.map(item => ({
      age_group: `${item.age_group}-${item.age_group + 4}`,
      count: item.count
    }));

    console.log('[Dashboard Routes] Age distribution found:', formattedDistribution);
    res.json(formattedDistribution);
  } catch (error) {
    console.error('[Dashboard Routes] Error fetching age distribution:', error);
    res.status(500).json({ 
      message: 'Server error while fetching age distribution',
      error: error.message 
    });
  }
});

module.exports = router; 