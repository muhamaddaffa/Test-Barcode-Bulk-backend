const modelPurchaseOrders = require("../../models/purchaseorders");
const modelAuditLogs = require("../../models/auditlogs");
const response = require("../../helpers/response");
const Logger = require("../../middleware/logger");
const Joi = require("joi");

// const modelPurchaseOrders = require("../../models/purchaseorders")

module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelPurchaseOrders.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            },);
            response.success(
                res,
                data.rows,
                "get data all purchase orders",
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
            const data = await modelPurchaseOrders.findByPk(id);
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data purchase order",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `purchase order with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, err.message);

        }
    },
    create: async (req, res) => {
        const { data } = req.body
        const user = req.user
        try {
            const dataRes = await modelPurchaseOrders.create({ ...data, createdBy: user.id })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'insert', modelData: 'purchase-order', newValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "create purchase order success",
                    null,
                    null,
                    null
                );
            }

        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { data } = req.body;
        const user = req.user
        try {
            const dataRes = await modelPurchaseOrders.update({ ...data, updatedBy: user.id }, {
                where: { id }
            })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'update', modelData: 'purchase-order', previousValue: data, newValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "update purchase order success",
                    null,
                    null,
                    null
                );
            }
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const user = req.user
        try {
            const dataRes = await modelPurchaseOrders.destroy({ where: { id } })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'delete', modelData: 'purchase-order', previousValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "delete purchase order success",
                    null,
                    null,
                    null
                );
            }
        } catch (error) {
            response.badrequest(res, error.message);

        }
    }
};
