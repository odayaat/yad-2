// Import necessary modules
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/index");

// Define the Ad model
const Ad = sequelize.define("Ad", {
  // Title property
  title: {
    type: DataTypes.STRING, // Data type is string
    allowNull: false, // Title cannot be null
    validate: {
      len: [1, 20], // Title length must be between 1 and 20 characters
    },
  },

  // Description property
  description: {
    type: DataTypes.STRING, // Data type is string
    allowNull: false, // Description cannot be null
    validate: {
      len: [1, 200], // Description length must be between 1 and 200 characters
    },
  },

  // Price property
  price: {
    type: DataTypes.DECIMAL, // Data type is decimal
    allowNull: false, // Price cannot be null
  },


  // Phone property
  phone: {
    type: DataTypes.STRING, // Data type is string
    allowNull: false, // Phone cannot be null
    validate: {
      is: /^\d{3}-\d{7}$/, // Phone must match the pattern '###-#######'
    },
  },

  // Email property
  email: {
    type: DataTypes.STRING, // Data type is string
    allowNull: false, // Email cannot be null
    validate: {
      isEmail: true, // Email must be a valid email address
    },
  },

  // isApproved property
  isApproved: {
    type: DataTypes.BOOLEAN, // Data type is boolean
    allowNull: false, // isApproved cannot be null
    defaultValue: false, // Default value is false
  },
});

// Export the Ad model
module.exports = Ad;
