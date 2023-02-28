"use strict";

require("dotenv").config(); // Loads environment variables from a .env file into process.env -> https://www.npmjs.com/package/dotenv

/* JSON Web Token configuration */
module.exports = {
  development: {
    tokenLife: process.env.TOKEN_LIFE || 8,
    tokenSecret: process.env.TOKEN_SECRET || "token-secret",
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 7,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret",
  },
  production: {
    tokenLife: process.env.TOKEN_LIFE || 8,
    tokenSecret: process.env.TOKEN_SECRET || "token-secret",
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 7,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret",
  },
};
