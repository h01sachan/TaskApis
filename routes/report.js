const express = require("express");
const router = express.Router();

//import controllers
const reportController = require("../controllers/report");

router.route("/")
        .post(reportController.createReport)
        .get(reportController.getReports)
module.exports = router;
