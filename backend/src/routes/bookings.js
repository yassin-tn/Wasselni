const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { Booking, Ride, User, Vehicle } = require('../models');
const { sequelize } = require('../models');

const router = express.Router();

// Create booking
router.post('/', authMiddleware,
  [
    body('rideId').isInt(),
    body('seatsBooked').isInt({ min: 1 })
  ],
  async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await t.rollback();
        return res.status(400).json({ errors: errors.array() });
      }

      const { rideId, seatsBooked } = req.body;

      // Lock the ride row for update
      const ride = await Ride.findByPk(rideId, {
        lock: t.LOCK.UPDATE,
        transaction: t
      });

      if (!ride) {
        await t.rollback();
        return res.status(404).json({ error: 'Ride not found' });
      }

      if (ride.driverId === req.user.id) {
        await t.rollback();
        return res.status(400).json({ error: 'Cannot book your own ride' });
      }

      if (ride.status !== 'open') {
        await t.rollback();
        return res.status(400).json({ error: 'Ride is not available for booking' });
      }

      if (ride.availableSeats < seatsBooked) {
        await t.rollback();
        return res.status(400).json({ error: 'Not enough seats available' });
      }

      const totalPrice = ride.pricePerSeat * seatsBooked;

      const booking = await Booking.create({
        rideId,
        riderId: req.user.id,
        seatsBooked,
        totalPrice,
        status: 'confirmed'
      }, { transaction: t });

      await ride.update({
        availableSeats: ride.availableSeats - seatsBooked,
        status: ride.availableSeats - seatsBooked === 0 ? 'full' : 'open'
      }, { transaction: t });

      await t.commit();

      const bookingWithDetails = await Booking.findByPk(booking.id, {
        include: [
          {
            model: Ride,
            as: 'ride',
            include: [
              { model: User, as: 'driver', attributes: ['id', 'fullName', 'phone', 'rating', 'profilePhoto'] },
              { model: Vehicle, as: 'vehicle' }
            ]
          }
        ]
      });

      // Notify driver via socket
      const io = req.app.get('io');
      io.to(`user:${ride.driverId}`).emit('booking:new', {
        bookingId: booking.id,
        riderName: req.user.fullName,
        seats: seatsBooked
      });

      res.status(201).json({ booking: bookingWithDetails });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
);

// Get my bookings (as rider)
router.get('/mine', authMiddleware, async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      where: { riderId: req.user.id },
      include: [
        {
          model: Ride,
          as: 'ride',
          include: [
            { model: User, as: 'driver', attributes: ['id', 'fullName', 'rating', 'profilePhoto', 'phone'] },
            { model: Vehicle, as: 'vehicle' }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
});

// Cancel booking
router.post('/:id/cancel', authMiddleware, async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id, riderId: req.user.id },
      include: [{ model: Ride, as: 'ride' }],
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!booking) {
      await t.rollback();
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      await t.rollback();
      return res.status(400).json({ error: 'Booking already cancelled' });
    }

    await booking.update({ status: 'cancelled' }, { transaction: t });

    const ride = await Ride.findByPk(booking.rideId, {
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    await ride.update({
      availableSeats: ride.availableSeats + booking.seatsBooked,
      status: 'open'
    }, { transaction: t });

    await t.commit();

    // Notify driver
    const io = req.app.get('io');
    io.to(`user:${ride.driverId}`).emit('booking:cancelled', {
      bookingId: booking.id,
      riderName: req.user.fullName
    });

    res.json({ booking });
  } catch (error) {
    await t.rollback();
    next(error);
  }
});

module.exports = router;
