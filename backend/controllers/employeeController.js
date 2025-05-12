const User = require('../models/userModel');
const { Op, Sequelize } = require('sequelize');

exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const archived = parseInt(req.query.archived) || 0;
    const search = req.query.search || '';

    console.log('Fetching employees with params:', { page, limit, offset, archived, search });

    const whereClause = {
      role: 'employe',
      isArchived: archived
    };

    // Add search condition if search term is provided
    if (search) {
      whereClause[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: employees } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id_user',
        'first_name',
        'last_name',
        'birth_date',
        'hire_date',
        'department_id',
        'position',
        'salary',
        'genre_employee',
        'isArchived',
        'isValid',
        'role'
      ],
      limit,
      offset,
      order: [['id_user', 'ASC']]
    });

    console.log(`Found ${count} employees, showing ${employees.length}`);

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

exports.addEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      birth_date,
      hire_date,
      department_id,
      position,
      salary,
      genre_employee
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !birth_date || !hire_date || !department_id || !position || !salary || !genre_employee) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new employee
    const newEmployee = await User.create({
      first_name,
      last_name,
      birth_date,
      hire_date,
      department_id,
      position,
      salary,
      genre_employee,
      role: 'employe',
      isValid: 1,
      // Generate a temporary email and password (in a real app, you'd want to handle this differently)
      email_user: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@company.com`,
      motDePasse: 'defaultPassword123' // In a real app, this should be hashed and require a password change on first login
    });

    return res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmployee
    });
  } catch (error) {
    console.error('Error adding employee:', error);
    return res.status(500).json({ 
      message: 'Server error while adding employee',
      error: error.message 
    });
  }
};

exports.archiveEmployee = async (req, res) => {
  try {
    console.log('Archive request received:', req.body);
    const { id_user } = req.body;
    
    if (!id_user) {
      console.log('No id_user provided in request');
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    console.log('Looking for employee with ID:', id_user);
    const employee = await User.findByPk(id_user);
    
    if (!employee) {
      console.log('Employee not found with ID:', id_user);
      return res.status(404).json({ message: 'Employee not found' });
    }

    console.log('Current employee status:', {
      id: employee.id_user,
      isArchived: employee.isArchived,
      isValid: employee.isValid
    });

    // Set isArchived to 1 to archive the employee
    employee.isArchived = 1;
    await employee.save();

    console.log('Employee archived successfully:', {
      id: employee.id_user,
      isArchived: employee.isArchived
    });

    return res.status(200).json({
      message: 'Employee archived successfully',
      employee
    });
  } catch (error) {
    console.error('Error archiving employee:', error);
    return res.status(500).json({ 
      message: 'Server error while archiving employee',
      error: error.message 
    });
  }
};

exports.getArchivedEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: employees } = await User.findAndCountAll({
      where: { 
        role: 'employe',
        isValid: 0 // Get only archived employees
      },
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
    console.error('Error fetching archived employees:', error);
    return res.status(500).json({ 
      message: 'Server error while fetching archived employees',
      error: error.message 
    });
  }
};

exports.restoreEmployee = async (req, res) => {
  try {
    console.log('Restore request received:', req.body);
    const { id_user } = req.body;
    
    if (!id_user) {
      console.log('No id_user provided in request');
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    console.log('Looking for employee with ID:', id_user);
    const employee = await User.findByPk(id_user);
    
    if (!employee) {
      console.log('Employee not found with ID:', id_user);
      return res.status(404).json({ message: 'Employee not found' });
    }

    console.log('Current employee status:', {
      id: employee.id_user,
      isArchived: employee.isArchived
    });

    // Set isArchived to 0 to restore the employee
    employee.isArchived = 0;
    await employee.save();

    console.log('Employee restored successfully:', {
      id: employee.id_user,
      isArchived: employee.isArchived
    });

    return res.status(200).json({
      message: 'Employee restored successfully',
      employee
    });
  } catch (error) {
    console.error('Error restoring employee:', error);
    return res.status(500).json({ 
      message: 'Server error while restoring employee',
      error: error.message 
    });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id_user } = req.body;
    
    if (!id_user) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findByPk(id_user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle isValid status
    user.isValid = user.isValid === 1 ? 0 : 1;
    await user.save();

    return res.status(200).json({
      message: user.isValid === 1 ? 'User unblocked successfully' : 'User blocked successfully',
      user
    });
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    return res.status(500).json({ 
      message: 'Server error while blocking/unblocking user',
      error: error.message 
    });
  }
};

module.exports = exports; 