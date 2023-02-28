const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const response = require("../helpers/response");
require("dotenv").config();
module.exports = {
  isLogin: async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return response.unauthorized(res, "Unauthorized");
      }
      const token = req.headers.authorization.replace("Bearer ", "")

      const key = process.env.JWT_KEY;

      const data = jwt.verify(token, key);
      const user = await Users.findOne({ where: { userId: data.UserId } });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      response.unauthorized(res, err.message);
    }
  },
};
