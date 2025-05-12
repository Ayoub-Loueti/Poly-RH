const Absence = require('../models/AbsenceModel');
const { Op } = require('sequelize');

// Create a new absence request
const createAbsence = async (req, res) => {
  try {
    const { id_user, start_date, end_date, absence_type } = req.body;

    const absence = await Absence.create({
      id_user,
      start_date,
      end_date,
      absence_type,
      isAbOk: 'attente'
    });

    res.status(201).json({
      success: true,
      message: 'Absence request created successfully',
      data: absence
    });
  } catch (error) {
    console.error('Error creating absence:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating absence request',
      error: error.message
    });
  }
};

// Update absence status (accept/reject)
const updateAbsenceStatus = async (req, res) => {
  try {
    const { absence_id, status } = req.body;

    if (!['accepter', 'refuser'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be either "accepter" or "refuser"'
      });
    }

    const absence = await Absence.findByPk(absence_id);
    if (!absence) {
      return res.status(404).json({
        success: false,
        message: 'Absence request not found'
      });
    }

    absence.isAbOk = status;
    await absence.save();

    res.json({
      success: true,
      message: `Absence request ${status === 'accepter' ? 'accepted' : 'rejected'} successfully`,
      data: absence
    });
  } catch (error) {
    console.error('Error updating absence status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating absence status',
      error: error.message
    });
  }
};

// Get all pending absences
const getPendingAbsences = async (req, res) => {
  try {
    const pendingAbsences = await Absence.findAll({
      where: {
        isAbOk: 'attente'
      },
      order: [['start_date', 'ASC']]
    });

    res.json({
      success: true,
      data: pendingAbsences
    });
  } catch (error) {
    console.error('Error fetching pending absences:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending absences',
      error: error.message
    });
  }
};

// Get all absences for a specific user
const getUserAbsences = async (req, res) => {
  try {
    const { id_user } = req.body;

    const userAbsences = await Absence.findAll({
      where: {
        id_user
      },
      order: [['start_date', 'DESC']]
    });

    res.json({
      success: true,
      data: userAbsences
    });
  } catch (error) {
    console.error('Error fetching user absences:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user absences',
      error: error.message
    });
  }
};

module.exports = {
  createAbsence,
  updateAbsenceStatus,
  getPendingAbsences,
  getUserAbsences
};
