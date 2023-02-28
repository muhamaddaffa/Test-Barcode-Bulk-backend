const modelMenus = require("../../models/menus");
const modelRoles = require("../../models/roles");
const modelMapRoleMenu = require("../../models/mapRoleMenu");
const modelAuditLogs = require("../../models/auditlogs");
const response = require("../../helpers/response");

// const modelMenus = require("../../models/purchaseorders")

modelMenus.belongsToMany(modelRoles, { through: modelMapRoleMenu });
modelRoles.belongsToMany(modelMenus, { through: modelMapRoleMenu });


module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await modelMenus.findAndCountAll({
                limit,
                offset,
            });
            response.success(
                res,
                data.rows,
                "get data all menus",
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
            const data = await modelMenus.findByPk(id);
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data menu",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `menu with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    findRoleWithMenu: async (req, res) => {
        const { roleId } = req.params;
        try {
            const data = await modelRoles.findOne({ where: { id: roleId }, include: [{ model: modelMenus, attributes: { include: ['name', 'path', 'icon', 'exact'] }, order: [['sort', 'ASC']] }] });
            if (data) {
                return response.success(
                    res,
                    data,
                    "Success get data menu",
                    null,
                    null,
                    null
                );
            }
            response.badrequest(res, `menu with id ${id} is not found`);
        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    create: async (req, res) => {
        const { data } = req.body
        try {
            const dataRes = await modelMenus.create(data)

            response.success(
                res,
                dataRes,
                "create menu success",
                null,
                null,
                null
            );

        } catch (error) {
            response.badrequest(res, error.message);

        }
    },
    createMapRole: async (req, res) => {
        const { data } = req.body
        let dataRes = null
        try {
            const roles = data.roles;
            for (let i = 0; i < roles.length; i++) {
                dataRes = await modelMapRoleMenu.create({ menuId: data.menuId, roleId: roles[i] })
            }

            response.success(
                res,
                dataRes,
                "create menu role success",
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
            const dataRes = await modelMenus.update(data, {
                where: { id }
            })
            response.success(
                res,
                dataRes,
                "update menu success",
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
            const dataRes = await modelMenus.destroy({ where: { id } })
            response.success(
                res,
                dataRes,
                "delete menu success",
                null,
                null,
                null
            );

        } catch (error) {
            response.badrequest(res, error.message);

        }
    }
};
