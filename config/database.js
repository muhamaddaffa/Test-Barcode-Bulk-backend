"use strict";

require("dotenv").config(); // Loads environment variables from a .env file into process.env -> https://www.npmjs.com/package/dotenv

module.exports = {
  // Development Environment
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: process.env.NODE_ENV == "PRODUCTION" ? true : false,
    },
  },
  // Production Environment
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: process.env.NODE_ENV == "PRODUCTION" ? true : false,
    },
  },
};
