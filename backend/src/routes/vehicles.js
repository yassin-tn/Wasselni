const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { Vehicle } = require('../models');

const router = express.Router();

// Create vehicle
router.post('/', authMiddleware,
  [
    body('make').trim().notEmpty(),
    body('model').trim().notEmpty(),
    body('plateNumber').trim().notEmpty(),
    body('seats').isInt({ min: 1, max: 8 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const vehicle = await Vehicle.create({
        ...req.body,
        userId: req.user.id
      });

      res.status(201).json({ vehicle });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Plate number already exists' });
      }
      next(error);
    }
  }
);

// Get my vehicles
router.get('/mine', authMiddleware, async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { userId: req.user.id }
    });
    res.json({ vehicles });
  } catch (error) {
    next(error);
  }
});

// Delete vehicle
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
