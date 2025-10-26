const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:./dev.db', {
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: process.env.DATABASE_URL?.startsWith('sqlite') ? {} : {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

const User = require('./user')(sequelize);
const Vehicle = require('./vehicle')(sequelize);
const Ride = require('./ride')(sequelize);
const Booking = require('./booking')(sequelize);

// Associations
User.hasMany(Vehicle, { foreignKey: 'userId', as: 'vehicles' });
Vehicle.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

User.hasMany(Ride, { foreignKey: 'driverId', as: 'offeredRides' });
Ride.belongsTo(User, { foreignKey: 'driverId', as: 'driver' });

Vehicle.hasMany(Ride, { foreignKey: 'vehicleId', as: 'rides' });
Ride.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

User.hasMany(Booking, { foreignKey: 'riderId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'riderId', as: 'rider' });

Ride.hasMany(Booking, { foreignKey: 'rideId', as: 'bookings' });
Booking.belongsTo(Ride, { foreignKey: 'rideId', as: 'ride' });

module.exports = {
  sequelize,
  User,
  Vehicle,
  Ride,
  Booking
};
