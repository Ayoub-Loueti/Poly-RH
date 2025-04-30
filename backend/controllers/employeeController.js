const Employee = require('../models/employeeModel');

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

module.exports = exports; 