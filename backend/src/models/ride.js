const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ride = sequelize.define('Ride', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Vehicles', key: 'id' }
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originLat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    originLng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destinationLat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    destinationLng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    pricePerSeat: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('open', 'full', 'completed', 'cancelled'),
      defaultValue: 'open'
    }
  });

  return Ride;
};
