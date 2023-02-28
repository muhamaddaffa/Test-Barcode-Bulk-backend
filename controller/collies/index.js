const modelCollies = require("../../models/collies");
const modelBatchs = require("../../models/batchs");
const modelAuditLogs = require("../../models/auditlogs");
const MapCollieBatch = require("../../models/mapCollieBatch");
const modelBottles = require("../../models/bottles");
const response = require("../../helpers/response");
const Logger = require("../../middleware/logger");
const Joi = require("joi");

const { transaction } = require('sequelize');
modelCollies.belongsToMany(modelBatchs, { through: MapCollieBatch });
modelBatchs.belongsToMany(modelCollies, { through: MapCollieBatch });
modelBatchs.hasMany(modelBottles, { foreignKey: "batchId", onDelete: 'CASCADE' });
modelBottles.belongsTo(modelCollies, { foreignKey: "collieId" });


// const modelCollies = require("../../models/purchaseorders")

module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelCollies.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all collies",
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
            const data = await modelCollies.findAndCountAll({
                where: { purchaseId },
                limit,
                offset,
                order: [['noCollie', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all collies",
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
            const data = await modelCollies.findByPk(id);
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data collie",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `collie with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllWithBatch: async (req, res) => {
        const { id } = req.params
        try {
            const data = await modelCollies.findOne({
                where: { id },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: modelBatchs,
                        include: [
                            {
                                model: modelBottles,
                                attributes: { exclude: ['qrCode', 'isApproved', 'isChecked'] },
                                order: [['bottleNumber']],
                                include: [{
                                    model: modelCollies,
                                    attributes: ['noCollie']
                                }]
                            }]
                    }
                ]
            });
            response.success(
                res,
                data,
                "get data all collie with batch",
                null,
                null,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllBatchWithBottleByCollie: async (req, res) => {
        const { id } = req.params
        try {
            const data = await modelCollies.findOne({
                where: { id },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: modelBatchs,
                        include: [{ model: modelBottles, where: { collieId: id }, attributes: { exclude: ['qrCode', 'isApproved', 'isChecked'] }, order: [['bottleNumber', 'DESC']] }]
                    }
                ]
            });
            response.success(
                res,
                data,
                "get data all collie with batch and bottles",
                null,
                null,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },

    // create: async (req, res) => {
    //     const { data } = req.body;
    //     const user = req.user;
    //     try {
    //         const batchIds = data.batchId;

    //         // start a transaction
    //         const t = await modelCollies.sequelize.transaction();

    //         // create the collie object
    //         const dataRes = await modelCollies.create({ ...data, batchId: JSON.stringify(batchIds), createdBy: user.id }, { transaction: t });
    //         if (dataRes) {
    //             // update the batch objects with the collieId
    //             for (let i = 0; i < batchIds.length; i++) {
    //                 await modelBatchs.update({ collieId: dataRes.id }, { where: { id: batchIds[i] } });
    //             }

    //             // create an audit log
    //             await modelAuditLogs.create({ userId: user.id, user, operation: 'insert', modelData: 'collie', newValue: dataRes });

    //             // commit the transaction
    //             await t.commit();

    //             response.success(
    //                 res,
    //                 dataRes,
    //                 "create collie success",
    //                 null,
    //                 null,
    //                 null
    //             );
    //         }
    //     } catch (error) {
    //         // if an error occurs, rollback the transaction
    //         await t.rollback();
    //         response.badrequest(res, error.message);

    //     }
    // },
    create: async (req, res) => {
        const { data } = req.body;
        const user = req.user;
        try {
            const batchIds = data.batchId;

            // create the collie object
            const dataRes = await modelCollies.create({ ...data, createdBy: user.id });
            if (dataRes) {
                // update the batch objects with the collieId
                for (let i = 0; i < batchIds.length; i++) {
                    await MapCollieBatch.create({ collyId: dataRes.id, batchId: batchIds[i] })
                    await modelBatchs.update({ collieId: dataRes.id }, { where: { id: batchIds[i] } });
                }
                // create an audit log
                await modelAuditLogs.create({ userId: user.id, user, operation: 'insert', modelData: 'collie', newValue: dataRes });

                response.success(
                    res,
                    dataRes,
                    "create collie success",
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
            const dataRes = await modelCollies.update({ ...data, updatedBy: user.id }, {
                where: { id }
            })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'update', modelData: 'collie', previousValue: data, newValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "update collie success",
                    null,
                    null,
                    null
                );
            }

            // response.notfound(res, 'Data collie not found')
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const user = req.user
        try {
            const bottles = await modelBottles.findAll({ where: { collieId: id } })
            const dataRes = await modelCollies.destroy({ where: { id } })
            if (dataRes) {
                await modelBatchs.update({ collieId: null }, { where: { collieId: id } })
                await modelAuditLogs.create({ userId: user.id, user, operation: 'delete', modelData: 'collie', previousValue: dataRes })
                if (bottles.length > 0) {
                    for (let i = 0; i < bottles.length; i++) {
                        await modelBottles.update({ collieId: null }, { where: { collieId: id } });
                    }
                }
                response.success(
                    res,
                    dataRes,
                    "delete collie success",
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
