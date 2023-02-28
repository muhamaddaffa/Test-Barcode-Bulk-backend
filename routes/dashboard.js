var express = require("express");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

const { findTotal } = require("../controller/dashboard");

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get Data All Users
 *     responses:
 *       200:
 *         description: Returns a row data users.
 */
router.get("/:purchaseId/po", findTotal);

module.exports = router;
