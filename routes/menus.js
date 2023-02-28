var express = require("express");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

const { findAll, findOne, findRoleWithMenu, create, createMapRole, update, delete: destroy } = require("../controller/menus");

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get Data All Users
 *     responses:
 *       200:
 *         description: Returns a row data users.
 */
router.get("/", findAll);
router.get("/:id", findOne);
router.get("/:roleId/role", findRoleWithMenu);
router.post("/", isLogin, create)
router.post("/create-map", isLogin, createMapRole)
router.put("/:id", isLogin, update)
router.delete("/:id", isLogin, destroy)

module.exports = router;
