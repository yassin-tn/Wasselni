const { User, Vehicle, Ride } = require('./models');

async function seedDatabase() {
  try {
    // Check if we already have data
    const existingRides = await Ride.count();
    if (existingRides > 0) {
      console.log('Database already has data, skipping seed.');
      return;
    }

    // Create sample users
    const users = await Promise.all([
      User.create({
        email: 'ahmed.driver@example.com',
        password: 'password123',
        fullName: 'Ahmed Ben Ali',
        phone: '+21698765432',
        gender: 'male',
        city: 'Tunis',
        bio: 'Conducteur expérimenté, j\'adore partager mes trajets!',
        rating: 4.8,
        isVerified: true
      }),
      User.create({
        email: 'fatma.commuter@example.com',
        password: 'password123',
        fullName: 'Fatma Trabelsi',
        phone: '+21698765433',
        gender: 'female',
        city: 'Ariana',
        bio: 'Trajet quotidien, heureuse de partager',
        rating: 4.9,
        isVerified: true
      }),
      User.create({
        email: 'mohamed.traveler@example.com',
        password: 'password123',
        fullName: 'Mohamed Agrebi',
        phone: '+21698765434',
        gender: 'male',
        city: 'Sousse',
        bio: 'Passionné de voyages le weekend',
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
        origin: 'Ariana',
        originLat: 36.8625,
        originLng: 10.1956,
        destination: 'Lac 2',
        destinationLat: 36.8381,
        destinationLng: 10.2397,
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
        originLng: 10.3250,
        destination: 'Hammamet',
        destinationLat: 36.4000,
        destinationLng: 10.6167,
        departureTime: nextWeek,
        availableSeats: 3,
        pricePerSeat: 12.00,
        notes: 'Route autoroute, un arrêt repos.',
        status: 'open'
      }),
      Ride.create({
        driverId: users[1].id,
        vehicleId: vehicles[1].id,
        origin: 'Menzah',
        originLat: 36.8381,
        originLng: 10.1675,
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

    console.log('✓ Données d\'exemple créées avec succès!');
    console.log('  - 3 utilisateurs créés');
    console.log('  - 3 véhicules créés');
    console.log('  - 5 trajets créés');
    console.log('\nIdentifiants de connexion:');
    console.log('  Email: ahmed.driver@example.com | Mot de passe: password123');
    console.log('  Email: fatma.commuter@example.com | Mot de passe: password123');
    console.log('  Email: mohamed.traveler@example.com | Mot de passe: password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seedDatabase;
