// Import necessary modules
const { Sequelize } = require("sequelize");

// Initialize a new Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite", // SQLite database dialect
  storage: "database.sqlite", // Path to the SQLite database file

  // Enable logging SQL queries to the console
  logging: console.log,
});

// Synchronize all defined models with the database
sequelize.sync();

// Export the initialized Sequelize instance and any models
module.exports = {
  sequelize, // Export the initialized Sequelize instance
  // You can export models here if needed in the future
};
