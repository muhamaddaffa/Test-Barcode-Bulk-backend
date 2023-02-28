const modelRoles = require("../../models/roles");
const modelAuditLogs = require("../../models/auditlogs");
const response = require("../../helpers/response");
const Logger = require("../../middleware/logger");
const Joi = require("joi");

// const modelRoles = require("../../models/purchaseorders")

module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelRoles.findAndCountAll({
                limit,
                offset,
            });
            response.success(
                res,
                data.rows,
                "get data all roles",
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
            const data = await modelRoles.findByPk(id);
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data role",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `role with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, err.message);

        }
    },
    create: async (req, res) => {
        const { data } = req.body
        try {
            const dataRes = await modelRoles.create(data)
            response.success(
                res,
                dataRes,
                "create role success",
                null,
                null,
                null
            );

        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { data } = req.body
        try {
            const dataRes = await modelRoles.update(data, {
                where: { id }
            })
            response.success(
                res,
                dataRes,
                "update role success",
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
            const dataRes = await modelRoles.destroy({ where: { id } })
            if (dataRes > 0) {
                response.success(
                    res,
                    dataRes,
                    "delete role success",
                    null,
                    null,
                    null
                );
            }
            response.notfound(res, 'Data role not found')
        } catch (error) {
            response.badrequest(res, error.message);

        }
    }
};
