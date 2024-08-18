// Import necessary modules
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/index");

// Define the User model
const User = sequelize.define("User", {
  // Username property
  username: {
    type: DataTypes.STRING, // Data type is string
    allowNull: false, // Username cannot be null
    unique: true, // Username must be unique
  },
  // Password property
  password: {
    type: DataTypes.STRING, // Data type is string
    allowNull: false, // Password cannot be null
  },
});

// Export the User model
module.exports = User;
