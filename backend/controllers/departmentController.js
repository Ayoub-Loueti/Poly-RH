const { Op } = require('sequelize');
const Employee = require('../models/employeeModel');
const Department = require('../models/departmentModel');

exports.getDepartmentStats = async (req, res) => {
  try {
    const { filter = 'all' } = req.query;

    let dateThreshold = null;
    const now = new Date();

    // Determine date threshold based on filter
    if (filter === '30d') {
      dateThreshold = new Date(now.setDate(now.getDate() - 30));
    } else if (filter === '90d') {
      dateThreshold = new Date(now.setDate(now.getDate() - 90));
    } else if (filter === '365d') {
      dateThreshold = new Date(now.setDate(now.getDate() - 365));
    }

    // Build where clause for date filtering
    let whereClause = {};
    if (dateThreshold) {
      whereClause.hire_date = { [Op.gte]: dateThreshold };
    }

    // Fetch all departments
    const departments = await Department.findAll();

    // Fetch filtered employees
    const employees = await Employee.findAll({ where: whereClause });

    if (!employees || employees.length === 0) {
      return res.status(200).json({
        message: 'No employees found in this period',
        data: departments.map(dep => ({
          department_id: dep.department_id,
          department_name: dep.department_name,
          employee_count: 0,
          percentage: '00.00%'
        }))
      });
    }

    // Count employees per department
    const total = employees.length;
    const departmentCounts = {};

    employees.forEach(emp => {
      if (!departmentCounts[emp.department_id]) {
        departmentCounts[emp.department_id] = 0;
      }
      departmentCounts[emp.department_id]++;
    });

    const stats = departments.map(dep => {
      const count = departmentCounts[dep.department_id] || 0;
      const percent = total > 0 ? ((count / total) * 100).toFixed(2) : '0.00';
      return {
        department_id: dep.department_id,
        department_name: dep.department_name,
        employee_count: count,
        percentage: `${percent}%`
      };
    });

    return res.status(200).json({
      message: `Stats for filter "${filter}"`,
      data: stats
    });

  } catch (error) {
    console.error('Error getting department stats:', error);
    return res.status(500).json({ message: 'Server error while calculating stats' });
  }
};

exports.getAgeDistribution = async (req, res) => {
    try {
      const now = new Date();
      const currentYear = now.getFullYear();
  
      const employees = await Employee.findAll({
        attributes: [
          [Sequelize.literal(`${currentYear} - YEAR(birth_date)`), 'age'],
          'age_employee'
        ]
      });
  
      const ranges = {
        '20-30': { homme: 0, femme: 0 },
        '30-40': { homme: 0, femme: 0 },
        '40-50': { homme: 0, femme: 0 },
        '50-60': { homme: 0, femme: 0 },
      };
  
      employees.forEach(emp => {
        const age = parseInt(emp.get('age'));
        const gender = emp.age_employee;
  
        if (age >= 20 && age < 30) ranges['20-30'][gender]++;
        else if (age >= 30 && age < 40) ranges['30-40'][gender]++;
        else if (age >= 40 && age < 50) ranges['40-50'][gender]++;
        else if (age >= 50 && age < 60) ranges['50-60'][gender]++;
      });
  
      res.status(200).json({
        message: 'Employee age distribution by gender',
        data: ranges
      });
    } catch (error) {
      console.error('Error getting age distribution:', error);
      res.status(500).json({ message: 'Server error while calculating age distribution' });
    }
  };

module.exports = exports; 