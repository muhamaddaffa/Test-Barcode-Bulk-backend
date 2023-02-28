const modelBottles = require("../../models/bottles");
const modelAuditLogs = require("../../models/auditlogs");
const modelBatchs = require("../../models/batchs");
const modelCollies = require("../../models/collies")
const response = require("../../helpers/response");
const Logger = require("../../middleware/logger");
const Joi = require("joi");
var QRCode = require('qrcode')
var moment = require('moment'); // require

modelBottles.belongsTo(modelBatchs, { foreignKey: "batchId" });
modelBatchs.belongsTo(modelCollies, { foreignKey: "collieId" });


// const modelBottles = require("../../models/purchaseorders")

module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelBottles.findAndCountAll({
                limit,
                offset,
                attributes: { exclude: ['qrCode'] },
                order: [['createdAt', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all bottles",
                page,
                limit,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findAllByBatch: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const { batchId } = req.params
        try {
            const data = await modelBottles.findAndCountAll({
                where: { batchId },
                limit,
                offset,
                attributes: { exclude: ['qrCode'] },
                order: [['createdAt', 'DESC']]
            });
            response.success(
                res,
                data.rows,
                "get data all bottles",
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
            const data = await modelBottles.findByPk(id);
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data bottle",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `bottle with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    checkBottle: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await modelBottles.findOne({
                where: { serial: id },
                attributes: { exclude: ['isApproved', 'isChecked', 'note', 'qrCode', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'] },
                include: [
                    {
                        model: modelBatchs,
                        attributes: { exclude: ['isApproved', 'note', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: modelCollies,
                                attributes: { exclude: ['batchId', 'isApproved', 'Note', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'] },
                            }
                        ]
                    },
                ]
            });
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data bottle",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `bottle with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    create: async (req, res) => {
        const { startBottleNumber, endBottleNumber } = req.query;
        const startNumber = parseFloat(startBottleNumber)
        const endNumber = parseFloat(endBottleNumber)
        const { data } = req.body;
        const user = req.user;

        try {
            // Start a transaction
            const t = await modelBottles.sequelize.transaction();
            try {
                let expiredDate = moment(data.expiredDate).format('DD-MM-YY');
                // Check if endBottleNumber is greater than 0
                if (endNumber >= startNumber) {
                    let dataRes = [];
                    let serial = `0${Date.now()}`
                    // Loop through the range of numbers
                    for (let i = startNumber; i <= endNumber; i++) {
                        let fixserial = `0${parseInt(serial) + i}`
                        let dataQR = `01${data.batchNumber}/${i}/${expiredDate}/${fixserial}`
                        let dataurl = await QRCode.toDataURL(dataQR, { errorCorrectionLevel: 'H' });
                        dataRes.push(await modelBottles.create({ ...data, bottleNumber: i, serial: fixserial, qrCode: dataurl, expiredDate: data.expiredDate }, { transaction: t }));
                    }
                    await t.commit();
                    // Commit the transaction
                    response.success(
                        res,
                        dataRes,
                        "create bottle success",
                        null,
                        null,
                        null
                    );
                } else {
                    let serial = `0${Date.now()}`
                    let dataQR = `01${data.batchNumber}/${startBottleNumber}/${expiredDate}/${serial}`
                    let dataurl = await QRCode.toDataURL(dataQR, { errorCorrectionLevel: 'H' });
                    // If endBottleNumber is not greater than 0, create only one record
                    const dataRes = await modelBottles.create({ ...data, bottleNumber: startBottleNumber, serial, qrCode: dataurl, expiredDate: data.expiredDate }, { transaction: t });
                    await t.commit();
                    response.success(
                        res,
                        dataRes,
                        "create bottle success",
                        null,
                        null,
                        null
                    );
                }
            } catch (error) {
                // Rollback the transaction on error
                await t.rollback();
                response.badrequest(res, error.message);

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
            const dataRes = await modelBottles.update({ ...data, createdBy: user.id }, {
                where: { id }
            })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'update', modelData: 'bottle', previousValue: data, newValue: dataRes })

                response.success(
                    res,
                    dataRes,
                    "update bottle success",
                    null,
                    null,
                    null
                );
            }

        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    updateCollie: async (req, res) => {
        const { id } = req.params;
        const { data } = req.body
        const user = req.user
        try {
            const dataRes = await modelBottles.update({ collieId: data.collieId, createdBy: user.id }, {
                where: { id }
            })
            if (dataRes) {

                response.success(
                    res,
                    dataRes,
                    "update bottle success",
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
            const dataRes = await modelBottles.destroy({ where: { id } })
            if (dataRes) {
                await modelAuditLogs.create({ userId: user.id, user, operation: 'delete', modelData: 'bottle', previousValue: dataRes })
                response.success(
                    res,
                    dataRes,
                    "delete bottle success",
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
