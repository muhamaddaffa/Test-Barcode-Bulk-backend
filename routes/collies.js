var express = require("express");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

const { findAll, findAllByPO, findOne, findAllWithBatch, findAllBatchWithBottleByCollie, create, update, delete: destroy } = require("../controller/collies");

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
router.get("/:purchaseId/po", findAllByPO);
router.get("/:id/batch", findAllWithBatch);
router.get("/:id/batch-bottle", findAllBatchWithBottleByCollie);
router.get("/:id", findOne);
router.post("/", isLogin, create)
router.put("/:id", isLogin, update)
router.delete("/:id", isLogin, destroy)
// router.post("/created", isLogin, create);
// router.put("/updated/:id", isLogin, update);
// router.delete("/deleted/:id", isLogin, remove);

module.exports = router;
