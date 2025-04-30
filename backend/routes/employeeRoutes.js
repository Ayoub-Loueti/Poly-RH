const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Employee routes are working!' });
});

module.exports = router; 