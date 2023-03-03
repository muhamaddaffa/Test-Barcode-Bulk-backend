var express = require("express");
var router = express.Router();

// Route
const userRouter = require("./user");
const purchaseOrdersRouter = require("./purchaseOrders")
const colliesRouter = require("./collies")
const batchsRouter = require("./batchs")
const bottlesRouter = require("./bottles")
const rolesRouter = require("./roles")
const importLicenseRouter = require("./importLicense")
const dashboardRouter = require("./dashboard")
const menuRouter = require("./menus")
const exportRouter = require("./export")


// ENDPOINT

router.use("/auth", userRouter);
router.use("/roles", rolesRouter);
router.use("/purchase-orders", purchaseOrdersRouter);
router.use("/collies", colliesRouter);
router.use("/batchs", batchsRouter);
router.use("/bottles", bottlesRouter);
router.use("/menus", menuRouter);
router.use("/import-license", importLicenseRouter);
router.use("/dashboard", dashboardRouter);
router.use("/excel", exportRouter);

module.exports = router;
