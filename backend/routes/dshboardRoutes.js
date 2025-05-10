const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/departmentController');

// Get all employees
router.get('/depStats', dashboardController.getDepartmentStats);
router.get('/ageDistribution', dashboardController.getAgeDistribution);

module.exports = router; 