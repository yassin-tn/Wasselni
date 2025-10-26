const express = require('express');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const authMiddleware = require('../middleware/auth');
const { Ride, User, Vehicle, Booking } = require('../models');

const router = express.Router();

// Create ride
router.post('/', authMiddleware,
  [
    body('vehicleId').isInt(),
    body('origin').trim().notEmpty(),
    body('destination').trim().notEmpty(),
    body('departureTime').isISO8601(),
    body('availableSeats').isInt({ min: 1 }),
    body('pricePerSeat').isFloat({ min: 0 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Verify vehicle belongs to user
      const vehicle = await Vehicle.findOne({
        where: { id: req.body.vehicleId, userId: req.user.id }
      });

      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found or not owned by you' });
      }

      const ride = await Ride.create({
        ...req.body,
        driverId: req.user.id
      });

      const rideWithDetails = await Ride.findByPk(ride.id, {
        include: [
          { model: User, as: 'driver', attributes: ['id', 'fullName', 'rating', 'profilePhoto'] },
          { model: Vehicle, as: 'vehicle' }
        ]
      });

      res.status(201).json({ ride: rideWithDetails });
    } catch (error) {
      next(error);
    }
  }
);

// Search rides
router.get('/search', async (req, res, next) => {
  try {
    const { origin, destination, date, seats } = req.query;
    
    const where = { status: 'open' };
    
    if (origin) {
      where.origin = { [Op.like]: `%${origin}%` };
    }
    if (destination) {
      where.destination = { [Op.like]: `%${destination}%` };
    }
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      where.departureTime = { [Op.between]: [searchDate, nextDay] };
    }
    if (seats) {
      where.availableSeats = { [Op.gte]: parseInt(seats) };
    }

    const rides = await Ride.findAll({
      where,
      include: [
        { model: User, as: 'driver', attributes: ['id', 'fullName', 'rating', 'profilePhoto', 'isVerified'] },
        { model: Vehicle, as: 'vehicle' }
      ],
      order: [['departureTime', 'ASC']]
    });

    res.json({ rides });
  } catch (error) {
    next(error);
  }
});

// Get ride by ID
router.get('/:id', async (req, res, next) => {
  try {
    const ride = await Ride.findByPk(req.params.id, {
      include: [
        { model: User, as: 'driver', attributes: ['id', 'fullName', 'rating', 'profilePhoto', 'phone', 'isVerified'] },
        { model: Vehicle, as: 'vehicle' }
      ]
    });

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    res.json({ ride });
  } catch (error) {
    next(error);
  }
});

// Get my offered rides
router.get('/mine/offered', authMiddleware, async (req, res, next) => {
  try {
    const rides = await Ride.findAll({
      where: { driverId: req.user.id },
      include: [
        { model: Vehicle, as: 'vehicle' },
        { 
          model: Booking, 
          as: 'bookings',
          include: [{ model: User, as: 'rider', attributes: ['id', 'fullName', 'phone', 'rating'] }]
        }
      ],
      order: [['departureTime', 'DESC']]
    });

    res.json({ rides });
  } catch (error) {
    next(error);
  }
});

// Update ride
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const ride = await Ride.findOne({
      where: { id: req.params.id, driverId: req.user.id }
    });

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    const { availableSeats, pricePerSeat, notes, status, departureTime } = req.body;

    await ride.update({
      ...(availableSeats !== undefined && { availableSeats }),
      ...(pricePerSeat !== undefined && { pricePerSeat }),
      ...(notes !== undefined && { notes }),
      ...(status && { status }),
      ...(departureTime && { departureTime })
    });

    res.json({ ride });
  } catch (error) {
    next(error);
  }
});

// Cancel ride
router.post('/:id/cancel', authMiddleware, async (req, res, next) => {
  try {
    const ride = await Ride.findOne({
      where: { id: req.params.id, driverId: req.user.id }
    });

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    await ride.update({ status: 'cancelled' });

    // Notify all riders via socket
    const io = req.app.get('io');
    const bookings = await ride.getBookings();
    bookings.forEach(booking => {
      io.to(`user:${booking.riderId}`).emit('ride:cancelled', { rideId: ride.id });
    });

    res.json({ ride });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
