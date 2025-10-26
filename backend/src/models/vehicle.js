const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    plateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 8 }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Vehicle;
};
