let express = require("express");
let router = express.Router();

let salesController = require("../controller/sales.cotroller");

router.route("/all").get(salesController.getAllSales);

router.route("/totalNoOfSales").get(salesController.totalNoOfSales);

router.route("/getDistinctFlavours").get(salesController.getDistinctFlavours);

router.route("/totalQuantitySold").get(salesController.totalQuantitySold);

router.route("/totalAmountOfSalesBasedOnType").get(salesController.totalAmountOfSalesBasedOnType);

module.exports = router;
