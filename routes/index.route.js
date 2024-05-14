let express = require("express");
let router = express.Router();

let studentsRoute = require("./students.route");
let teacherRoute = require("./teachers.route");
let salesRoute = require("./sales.route");

router.get("/", function (req, res, next) {
  res.json("App ready");
});

router.use("/students", studentsRoute);

router.use("/teachers", teacherRoute);

router.use("/sales", salesRoute);

module.exports = router;
