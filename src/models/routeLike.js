const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const RouteLike = sequelize.define(
  "RouteLike",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "routeId"],
      },
    ],
  }
);

module.exports = RouteLike;
