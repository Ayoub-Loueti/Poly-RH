const User = require('../models/userModel');
const { Op, Sequelize } = require('sequelize');

exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: employees } = await User.findAndCountAll({
      where: { role: 'employe' }, // Filter by role
      limit,
      offset,
      order: [['id_user', 'ASC']]
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

exports.getAllEmployeesRH = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: employees } = await User.findAndCountAll({
      where: { role: 'Rh' }, // Filter by role
      limit,
      offset,
      order: [['id_user', 'ASC']]
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