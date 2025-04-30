const Employee = require('../models/employeeModel');
const { Op, Sequelize } = require('sequelize');

exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: employees } = await Employee.findAndCountAll({
      limit,
      offset,
      order: [['employee_id', 'ASC']]
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      employees,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ 
      message: 'Server error while fetching employees',
      error: error.message 
    });
  }
};

exports.getAgeDistributionByGender = async (req, res) => {
  try {
    const today = new Date();

    const employees = await Employee.findAll({
      attributes: [
        [Sequelize.literal(`FLOOR(DATEDIFF(NOW(), birth_date) / 365.25)`), 'age'],
        'age_employee'
      ]
    });

    const ranges = {
      '20-30': { homme: 0, femme: 0 },
      '30-40': { homme: 0, femme: 0 },
      '40-50': { homme: 0, femme: 0 },
      '50-60': { homme: 0, femme: 0 }
    };

    employees.forEach(emp => {
      const age = parseInt(emp.getDataValue('age'), 10);
      const gender = emp.age_employee;

      if (age >= 20 && age < 30) ranges['20-30'][gender]++;
      else if (age >= 30 && age < 40) ranges['30-40'][gender]++;
      else if (age >= 40 && age < 50) ranges['40-50'][gender]++;
      else if (age >= 50 && age < 60) ranges['50-60'][gender]++;
    });

    return res.status(200).json({ ageDistribution: ranges });

  } catch (error) {
    console.error('Error calculating age distribution:', error);
    return res.status(500).json({ 
      message: 'Server error while calculating age distribution',
      error: error.message
    });
  }
};

module.exports = exports; 