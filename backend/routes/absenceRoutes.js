const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Absence = require('../models/AbsenceModel');
const sequelize = require('../config/db');

// Debug middleware for absence routes
router.use((req, res, next) => {
  console.log(`[Absence Routes] ${req.method} ${req.url}`);
  next();
});

// Get all absences
router.get('/', async (req, res) => {
  try {
    console.log('[Absence Routes] Fetching all absences...');
    const absences = await Absence.findAll({
      raw: true
    });
    console.log(`[Absence Routes] Found ${absences.length} absences`);
    res.json(absences);
  } catch (error) {
    console.error('[Absence Routes] Error fetching absences:', error);
    res.status(500).json({ 
      message: 'Server error while fetching absences',
      error: error.message 
    });
  }
});

// Get absence type distribution
router.get('/types', async (req, res) => {
  try {
    console.log('[Absence Routes] Fetching absence types...');
    console.log('[Absence Routes] Request URL:', req.url);
    console.log('[Absence Routes] Request method:', req.method);
    
    // First check if we have any data
    const count = await Absence.count();
    console.log('[Absence Routes] Total absences count:', count);
    
    if (count === 0) {
      console.log('[Absence Routes] No absences found, returning empty array');
      return res.json([]);
    }

    const absenceTypes = await Absence.findAll({
      attributes: [
        'absence_type',
        [Sequelize.fn('COUNT', Sequelize.col('absence_id')), 'count']
      ],
      group: ['absence_type'],
      raw: true,
      order: [[Sequelize.fn('COUNT', Sequelize.col('absence_id')), 'DESC']]
    });

    console.log('[Absence Routes] Absence types found:', absenceTypes);
    res.json(absenceTypes);
  } catch (error) {
    console.error('[Absence Routes] Error fetching absence types:', error);
    res.status(500).json({ 
      message: 'Server error while fetching absence types',
      error: error.message 
    });
  }
});

// Get absence statistics
router.get('/stats', async (req, res) => {
  try {
    console.log('[Absence Routes] Fetching absence statistics...');
    
    // Get total number of employees (assuming we have an Employee model)
    const totalEmployees = await sequelize.query(
      'SELECT COUNT(*) as count FROM employees',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Get total absence days
    const totalAbsenceDays = await Absence.findAll({
      attributes: [
        [Sequelize.fn('SUM', 
          Sequelize.fn('DATEDIFF', 
            Sequelize.col('end_date'), 
            Sequelize.col('start_date')
          )
        ), 'total_days']
      ],
      raw: true
    });

    // Calculate average absence rate
    const totalDays = totalAbsenceDays[0].total_days || 0;
    const employeeCount = totalEmployees[0].count || 1;
    const averageAbsenceRate = (totalDays / (employeeCount * 365)) * 100;

    // Get last month's absence rate for comparison
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastMonthAbsences = await Absence.findAll({
      attributes: [
        [Sequelize.fn('SUM', 
          Sequelize.fn('DATEDIFF', 
            Sequelize.col('end_date'), 
            Sequelize.col('start_date')
          )
        ), 'total_days']
      ],
      where: {
        start_date: {
          [Op.gte]: lastMonth
        }
      },
      raw: true
    });

    const lastMonthDays = lastMonthAbsences[0].total_days || 0;
    const lastMonthRate = (lastMonthDays / (employeeCount * 30)) * 100;
    const rateChange = averageAbsenceRate - lastMonthRate;

    console.log('[Absence Routes] Absence statistics calculated:', {
      averageAbsenceRate,
      rateChange
    });

    res.json({
      averageAbsenceRate: averageAbsenceRate.toFixed(1),
      rateChange: rateChange.toFixed(1)
    });
  } catch (error) {
    console.error('[Absence Routes] Error calculating absence statistics:', error);
    res.status(500).json({ 
      message: 'Server error while calculating absence statistics',
      error: error.message 
    });
  }
});

// Basic test route
router.get('/test', (req, res) => {
  console.log('[Absence Routes] Test route hit');
  res.json({ message: 'Test route is working!' });
});

module.exports = router; 