const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Route = sequelize.define("Route", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  km: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  altitud: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dificultad: {
    type: DataTypes.ENUM("Facil", "Media", "Dificil", "Mortal"),
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Route;
