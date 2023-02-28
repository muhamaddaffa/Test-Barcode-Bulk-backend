const Users = require("../../models/users");
const Roles = require("../../models/roles");
const response = require("../../helpers/response");
const Logger = require("../../middleware/logger");
const Joi = require("joi");
const axios = require("axios")
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')

dotenv.config();

Users.belongsTo(Roles, { foreignKey: "roleIdApp" });

module.exports = {
  findAll: async (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const offset = (page - 1) * limit;
    try {
      const data = await Users.findAndCountAll({
        limit,
        offset,
        include: [{ model: Roles, attributes: ["id", "name"] }]
      });
      response.success(
        res,
        data.rows,
        "get data all users",
        page,
        limit,
        data.count
      );
    } catch (error) {
      response.badrequest(res, error.message);

    }
  },
  findOne: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Users.findByPk(id, { include: [{ model: Roles, attributes: ["id", "name"] }] });
      if (data) {
        return response.success(
          res,
          data,
          "Success get data user",
          null,
          null,
          null
        );
      }
      response.badrequest(res, `User with id ${id} is not found`);
    } catch (error) {
      response.badrequest(res, error.message);

    }
  },
  register: async (req, res) => {
    const { data } = req.body
    const username = data.email?.split('@biofarma.co.id')
    try {
      const dataRes = await Users.create({ ...data, username: username[0] })
      response.success(
        res,
        dataRes,
        "registered user success",
        null,
        null,
        null
      );

    } catch (error) {
      response.badrequest(res, error.message);

    }
  },
  login: async (req, res) => {
    const { data } = req.body;
    let dataLoginBio = ""
    try {

      const dataRes = await Users.findOne({ where: { username: data.username }, include: [{ model: Roles, attributes: ["id", "name"] }] })
      if (dataRes) {
        axios.post(process.env.API_LOGIN, {
          Username: data.username,
          Password: data.password,
          ApplicationCode: 'ESS'
        })
          .then(resp => {
            dataLoginBio = resp.data;
            const tokenBio = resp.data.Token
            delete dataLoginBio.PositionId
            delete dataLoginBio.OrganizationId
            delete dataLoginBio.PositionName
            delete dataLoginBio.UnitCode
            delete dataLoginBio.UnitName
            delete dataLoginBio.RoleId
            delete dataLoginBio.RoleName
            delete dataLoginBio.Grade
            delete dataLoginBio.Token

            const token = jwt.sign(dataLoginBio, process.env.JWT_KEY)
            dataRes.dataValues.token = token
            dataRes.dataValues.tokenBio = tokenBio
            response.success(res, dataRes, 'Login successfully', null, null, null)
          })
          .catch(error => {
            response.badrequest(res, 'Inccorect Username/Password');

          });
      } else {
        response.unauthorized(res, "user not registered")
      }
    } catch (error) {
      response.badrequest(res, error.message);

    }
  },
  updateRole: async (req, res) => {
    const { id } = req.params;
    const { data } = req.body
    try {
      const dataRes = await Users.update(data, {
        where: { id }
      })
      response.success(
        res,
        dataRes,
        "update user role success",
        null,
        null,
        null
      );

      // response.notfound(res, 'Data role not found')
    } catch (error) {
      response.badrequest(res, error.message);

    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const dataRes = await Users.destroy({ where: { id } })
      response.success(
        res,
        dataRes,
        "delete user success",
        null,
        null,
        null
      );

    } catch (error) {
      response.badrequest(res, error.message);

    }
  }
};
