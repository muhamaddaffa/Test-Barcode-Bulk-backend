var express = require("express");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

const { findOnePost, findOne, findAll, create, update, delete: destroy } = require("../controller/importLicense");

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get Data All Users
 *     responses:
 *       200:
 *         description: Returns a row data users.
 */
router.post("/", findOnePost);
router.get("/", findAll);
router.get("/:registration", findOne);
router.post("/create", isLogin, create)
router.put("/:id", isLogin, update)
router.delete("/", isLogin, destroy)

module.exports = router;
