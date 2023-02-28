var express = require("express");
var router = express.Router();
const { isLogin } = require("../../middleware/auth");

const { findAll, findOne, register, login, updateRole, delete: remove } = require("../../controller/auth");

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
router.post("/register", register);
router.post("/login", login);
// router.post("/created", isLogin, create);
router.put("/:id", isLogin, updateRole);
router.delete("/:id", isLogin, remove);

module.exports = router;
