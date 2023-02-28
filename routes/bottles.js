var express = require("express");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

const { findAll, findAllByBatch, findOne, checkBottle, create, update, updateCollie, delete: destroy } = require("../controller/bottles");


router.get("/", findAll);
router.get("/:batchId/batch", findAllByBatch);
router.get("/:id", findOne);
router.get("/:id/check", checkBottle);
router.post("/", create)
router.put("/:id", isLogin, update)
router.put("/:id/update-collie", isLogin, updateCollie)
router.delete("/:id", isLogin, destroy)
// router.post("/created", isLogin, create);
// router.put("/updated/:id", isLogin, update);
// router.delete("/deleted/:id", isLogin, remove);

module.exports = router;
