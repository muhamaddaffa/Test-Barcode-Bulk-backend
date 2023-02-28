const modelBatchs = require("../../models/batchs");
const modelBottles = require("../../models/bottles");
const modelImportLicense = require("../../models/importLicense");
const modelAuditLogs = require("../../models/auditlogs");
const response = require("../../helpers/response");
const Logger = require("../../middleware/logger");
const Joi = require("joi");

modelBatchs.hasMany(modelBottles, { foreignKey: "batchId", onDelete: 'CASCADE' });


module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelBatchs.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all batchs",
                page,
                limit,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllByPO: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const { purchaseId } = req.params
        try {
            const data = await modelBatchs.findAndCountAll({
                where: { purchaseId },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all batchs",
                page,
                limit,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllByCollie: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const { collieId } = req.params
        try {
            const data = await modelBatchs.findAndCountAll({
                where: { collieId },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all batchs",
                page,
                limit,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllByCollieWithBottle: async (req, res) => {
        const { collieId } = req.params
        try {
            const data = await modelBatchs.findAndCountAll({
                where: { collieId },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: modelBottles,
                        attributes: ["id", "bottleNumber", "serial", "volume", "specialStorageCondition", "qrCode"]
                    }
                ]
            });
            response.success(
                res,
                data.rows,
                "get data all batchs",
                null,
                null,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllByPOSelect: async (req, res) => {
        const { purchaseId } = req.params
        try {
            const data = await modelBatchs.findAndCountAll({
                where: { purchaseId },
                order: [['createdAt', 'DESC']],
                attributes: ["id", "batchNumber"]
            });
            const options = data.rows.map(item => {
                return { label: item.batchNumber, value: item.id }
            });
            response.success(
                res,
                options,
                "get data all batchs",
                null,
                null,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findImportLicense: async (req, res) => {
        try {
            const data = await modelImportLicense.findAndCountAll({
                order: [['id', 'ASC']]
            });
            const options = data.rows.map(item => {
                return { label: `${item.localpartner} - ${item.registration}`, value: item.registration }
            });
            response.success(
                res,
                options,
                "get data all import license",
                null,
                null,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findOne: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await modelBatchs.findByPk(id);
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data batch",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `batch with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, err.message);

        }
    },
    create: async (req, res) => {
        const { data } = req.body
        const user = req.user
        try {
            // const dataRes = await modelBatchs.create({ ...data, createdBy: user.id })
            const dataRes = await modelBatchs.create(data)
            console.log("create batch", dataRes)
            if (dataRes) {
                // await modelAuditLogs.create({ userId: user.id, user, operation: 'insert', modelData: 'batch', newValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "create batch success",
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
        const { data } = req.body
        const user = req.user
        try {
            const dataRes = await modelBatchs.update({ ...data, updatedBy: user.id }, {
                where: { id }
            })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'update', modelData: 'batch', previousValue: data, newValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "update batch success",
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
            const dataRes = await modelBatchs.destroy({ where: { id } })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'delete', modelData: 'batch', previousValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "delete batch success",
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
