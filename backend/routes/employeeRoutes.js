const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getAllEmployees);

router.get('/rhemploye', employeeController.getAllEmployeesRH);

// Add new employee
router.post('/add', employeeController.addEmployee);

// Archive employee
router.post('/archive', employeeController.archiveEmployee);

// Get archived employees
router.get('/archived', employeeController.getArchivedEmployees);

// Restore archived employee
router.post('/restore', employeeController.restoreEmployee);

module.exports = router; 