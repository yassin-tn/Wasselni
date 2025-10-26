const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rideId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Rides', key: 'id' }
    },
    riderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    seatsBooked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      defaultValue: 'confirmed'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return Booking;
};
