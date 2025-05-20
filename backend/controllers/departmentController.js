const { Op } = require('sequelize');
const User = require('../models/userModel');
const Department = require('../models/DepartmentModel');
const PDFDocument = require('pdfkit');

exports.getDepartmentStats = async (req, res) => {
  try {
    const { filter = 'all' } = req.query;

    let dateThreshold = null;
    const now = new Date();

    // Determine date threshold based on filter
    if (filter === '30d') {
      dateThreshold = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    } else if (filter === '90d') {
      dateThreshold = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
    } else if (filter === '1y') {
      dateThreshold = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000));
    }

    // Build where clause for date filtering
    let whereClause = {};
    if (dateThreshold) {
      whereClause.hire_date = { [Op.gte]: dateThreshold };
    }

    // Fetch all departments
    const departments = await Department.findAll();

    // Fetch filtered users
    const users = await User.findAll({ where: whereClause });

    if (!users || users.length === 0) {
      return res.status(200).json({
        message: 'No users found in this period',
        data: departments.map(dep => ({
          department_id: dep.department_id,
          department_name: dep.department_name,
          user_count: 0,
          percentage: '00.00%'
        }))
      });
    }

    // Count users per department
    const total = users.length;
    const departmentCounts = {};

    users.forEach(user => {
      if (!departmentCounts[user.department_id]) {
        departmentCounts[user.department_id] = 0;
      }
      departmentCounts[user.department_id]++;
    });

    const stats = departments.map(dep => {
      const count = departmentCounts[dep.department_id] || 0;
      const percent = total > 0 ? ((count / total) * 100).toFixed(2) : '0.00';
      return {
        department_id: dep.department_id,
        department_name: dep.department_name,
        user_count: count,
        percentage: `${percent}%`
      };
    });

    return res.status(200).json({
      message: `Stats for filter "${filter}"`,
      data: stats,
      debug: {
        dateThreshold,
        totalUsers: users.length
      }
    });

  } catch (error) {
    console.error('Error getting department stats:', error);
    return res.status(500).json({ message: 'Server error while calculating stats' });
  }
};

exports.getAgeDistribution = async (req, res) => {
  try {
    const { filter = 'all' } = req.query;

    let dateThreshold = null;
    const now = new Date();

    // Determine date threshold based on filter
    if (filter === '30d') {
      dateThreshold = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    } else if (filter === '90d') {
      dateThreshold = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
    } else if (filter === '1y') {
      dateThreshold = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000));
    }

    // Build where clause for date filtering
    let whereClause = {};
    if (dateThreshold) {
      whereClause.hire_date = { [Op.gte]: dateThreshold };
    }

    // Fetch users with their birth dates
    const users = await User.findAll({
      where: whereClause,
      attributes: ['birth_date', 'genre_employee', 'hire_date']
    });

    // Initialize age distribution object
    const ageDistribution = {
      "20-30": { homme: 0, femme: 0 },
      "30-40": { homme: 0, femme: 0 },
      "40-50": { homme: 0, femme: 0 },
      "50-60": { homme: 0, femme: 0 }
    };

    // Calculate age and categorize users
    users.forEach(user => {
      const birthDate = new Date(user.birth_date);
      const age = now.getFullYear() - birthDate.getFullYear();
      const gender = user.genre_employee;

      if (age >= 20 && age < 30) {
        ageDistribution["20-30"][gender]++;
      } else if (age >= 30 && age < 40) {
        ageDistribution["30-40"][gender]++;
      } else if (age >= 40 && age < 50) {
        ageDistribution["40-50"][gender]++;
      } else if (age >= 50 && age <= 60) {
        ageDistribution["50-60"][gender]++;
      }
    });

    return res.status(200).json({
      message: `Age distribution for filter "${filter}"`,
      ageDistribution,
      debug: {
        dateThreshold,
        totalUsers: users.length,
        firstUserHireDate: users[0]?.hire_date
      }
    });

  } catch (error) {
    console.error('Error getting age distribution:', error);
    return res.status(500).json({ message: 'Server error while calculating age distribution' });
  }
};

exports.exportDepartmentsToPDF = async (req, res) => {
  try {
    // Fetch departments and users
    const departments = await Department.findAll();
    const users = await User.findAll();

    // Count users per department
    const departmentCounts = {};
    users.forEach(user => {
      if (!departmentCounts[user.department_id]) {
        departmentCounts[user.department_id] = 0;
      }
      departmentCounts[user.department_id]++;
    });

    // Create PDF
    const doc = new PDFDocument();
    
    // Set headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=departments.pdf');

    // Pipe to response
    doc.pipe(res);

    // Add content
    doc.fontSize(25).text('Department Report', { align: 'center' });
    doc.moveDown();

    // Add departments table
    doc.fontSize(12);
    doc.text('Department Name', 50, 150);
    doc.text('Type', 250, 150);
    doc.text('Employees', 400, 150);
    doc.moveDown();

    let y = 180;
    departments.forEach(dep => {
      const count = departmentCounts[dep.department_id] || 0;
      doc.text(dep.department_name, 50, y);
      doc.text(dep.departement_type, 250, y);
      doc.text(count.toString(), 400, y);
      y += 20;
    });

    // Add total
    doc.moveDown();
    const totalEmployees = Object.values(departmentCounts).reduce((a, b) => a + b, 0);
    doc.text(`Total Departments: ${departments.length}`, 50, y + 20);
    doc.text(`Total Employees: ${totalEmployees}`, 50, y + 40);

    // Finalize
    doc.end();

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
};

module.exports = exports; 