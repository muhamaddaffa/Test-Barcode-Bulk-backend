const modelBatchs = require("../../models/batchs");
const modelBottles = require("../../models/bottles");
const modelCollies = require("../../models/collies")
const response = require("../../helpers/response");
modelBatchs.hasMany(modelBottles, { foreignKey: "batchId" });


module.exports = {
    findTotal: async (req, res) => {
        const { purchaseId } = req.params
        try {
            const collies = await modelCollies.count({
                where: { purchaseId }
            })
            const batchs = await modelBatchs.count({
                where: { purchaseId }
            })
            const bottles = await modelBatchs.count({
                where: { purchaseId }, include: [
                    {
                        model: modelBottles,
                    }
                ]
            })
            const data = {
                collies,
                batchs,
                bottles
            }
            response.success(
                res,
                data,
                "get data total",
                null,
                null,
                null
            );

        } catch (error) {
            response.badrequest(res, error.message);
        }
    }
}