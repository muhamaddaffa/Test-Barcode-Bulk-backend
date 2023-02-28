
const modelImportLicense = require("../../models/importLicense");
const response = require("../../helpers/response");

module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelImportLicense.findAndCountAll({
                limit,
                offset,
            });
            response.success(
                res,
                data.rows,
                "get data all import license",
                page,
                limit,
                data.count
            );
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findOne: async (req, res) => {
        const { registration } = req.params
        try {
            const dataRes = await modelImportLicense.findOne({ where: { registration: registration } });
            response.success(
                res,
                dataRes,
                "get data  import license",
                null,
                null,
                null
            );
        } catch (error) {
            response.badrequest(res, error.message);
        }
    },
    findOnePost: async (req, res) => {
        const { registration } = req.body
        try {
            const dataRes = await modelImportLicense.findOne({ where: { registration: registration } });
            response.success(
                res,
                dataRes,
                "get data  import license",
                null,
                null,
                null
            );
        } catch (error) {
            response.badrequest(res, error.message);
        }
    },
    create: async (req, res) => {
        const { data } = req.body
        try {
            const dataRes = await modelImportLicense.create(data)
            response.success(
                res,
                dataRes,
                "create import license success",
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
            const dataRes = await modelImportLicense.update(data, {
                where: { id }
            })
            response.success(
                res,
                dataRes,
                "update import license success",
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
            const dataRes = await modelImportLicense.destroy({ where: { id } })
            if (dataRes > 0) {
                response.success(
                    res,
                    dataRes,
                    "delete import license success",
                    null,
                    null,
                    null
                );
            }
            response.notfound(res, 'Data import license not found')
        } catch (error) {
            response.badrequest(res, error.message);

        }
    }

}