const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getAllEmployees);

router.get('/rhemploye', employeeController.getAllEmployeesRH);


module.exports = router; 