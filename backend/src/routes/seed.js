const express = require('express');
const { User, Vehicle, Ride } = require('../models');

const router = express.Router();

// Seed sample data (for development only)
router.post('/seed', async (req, res) => {
  try {
    // Check if we already have rides
    const existingRides = await Ride.count();
    if (existingRides > 0) {
      return res.json({ message: 'Database already has sample rides' });
    }

    // Create sample users
    const users = await Promise.all([
      User.create({
        email: 'ahmed.driver@example.com',
        password: 'password123',
        fullName: 'Ahmed Ben Ali',
        phone: '+21612345678',
        gender: 'male',
        city: 'Tunis',
        bio: 'Conducteur expérimenté, trajets quotidiens!',
        rating: 4.8,
        isVerified: true
      }),
      User.create({
        email: 'fatma.commuter@example.com',
        password: 'password123',
        fullName: 'Fatma Trabelsi',
        phone: '+21698765432',
        gender: 'female',
        city: 'Ariana',
        bio: 'Covoiturage quotidien vers le centre-ville',
        rating: 4.9,
        isVerified: true
      }),
      User.create({
        email: 'mohamed.traveler@example.com',
        password: 'password123',
        fullName: 'Mohamed Agrebi',
        phone: '+21655443322',
        gender: 'male',
        city: 'Sousse',
        bio: 'Voyages inter-villes réguliers',
        rating: 4.7,
        isVerified: true
      })
    ]);

    // Create sample vehicles
    const vehicles = await Promise.all([
      Vehicle.create({
        userId: users[0].id,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Silver',
        plateNumber: 'ABC123',
        seats: 4
      }),
      Vehicle.create({
        userId: users[1].id,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        color: 'Blue',
        plateNumber: 'XYZ789',
        seats: 4
      }),
      Vehicle.create({
        userId: users[2].id,
        make: 'Ford',
        model: 'Explorer',
        year: 2021,
        color: 'Black',
        plateNumber: 'DEF456',
        seats: 6
      })
    ]);

    // Create sample rides
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(14, 30, 0, 0);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    dayAfterTomorrow.setHours(9, 30, 0, 0);

    await Promise.all([
      Ride.create({
        driverId: users[0].id,
        vehicleId: vehicles[0].id,
        origin: 'Centre Ville Tunis',
        originLat: 36.8065,
        originLng: 10.1815,
        destination: 'Aéroport Tunis-Carthage',
        destinationLat: 36.8510,
        destinationLng: 10.2272,
        departureTime: tomorrow,
        availableSeats: 3,
        pricePerSeat: 8.00,
        notes: 'Trajet confortable, climatisation disponible.',
        status: 'open'
      }),
      Ride.create({
        driverId: users[1].id,
        vehicleId: vehicles[1].id,
        origin: 'Ariana Centre',
        originLat: 36.8625,
        originLng: 10.1956,
        destination: 'Lac 2, Tunis',
        destinationLat: 36.8380,
        destinationLng: 10.2398,
        departureTime: dayAfterTomorrow,
        availableSeats: 2,
        pricePerSeat: 5.00,
        notes: 'Trajet quotidien. Véhicule non-fumeur.',
        status: 'open'
      }),
      Ride.create({
        driverId: users[2].id,
        vehicleId: vehicles[2].id,
        origin: 'Tunis',
        originLat: 36.8065,
        originLng: 10.1815,
        destination: 'Sousse',
        destinationLat: 35.8256,
        destinationLng: 10.6369,
        departureTime: nextWeek,
        availableSeats: 4,
        pricePerSeat: 15.00,
        notes: 'Voyage weekend! Espace bagages disponible.',
        status: 'open'
      }),
      Ride.create({
        driverId: users[0].id,
        vehicleId: vehicles[0].id,
        origin: 'La Marsa',
        originLat: 36.8780,
        originLng: 10.3247,
        destination: 'Hammamet',
        destinationLat: 36.4000,
        destinationLng: 10.6167,
        departureTime: nextWeek,
        availableSeats: 3,
        pricePerSeat: 12.00,
        notes: 'Route côtière, un arrêt repos prévu.',
        status: 'open'
      }),
      Ride.create({
        driverId: users[1].id,
        vehicleId: vehicles[1].id,
        origin: 'Menzah 6',
        originLat: 36.8397,
        originLng: 10.1703,
        destination: 'Nabeul',
        destinationLat: 36.4561,
        destinationLng: 10.7356,
        departureTime: tomorrow,
        availableSeats: 1,
        pricePerSeat: 10.00,
        notes: 'Trajet calme, pas de musique forte.',
        status: 'open'
      })
    ]);

    res.json({
      message: 'Sample data created successfully!',
      summary: {
        users: 3,
        vehicles: 3,
        rides: 5
      },
      loginCredentials: [
        { email: 'ahmed.driver@example.com', password: 'password123' },
        { email: 'fatma.commuter@example.com', password: 'password123' },
        { email: 'mohamed.traveler@example.com', password: 'password123' }
      ]
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

module.exports = router;
