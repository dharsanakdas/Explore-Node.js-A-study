let express = require("express");
let router = express.Router();
let dbHandler = require("./../database/db");

router.route("/allTeachers").get(dbHandler.getAllTeachers);

router.route("/allTeachersAsyncAwaut").get(dbHandler.getAllTeachersAsynchAwait);

router.route("/insertTeacher").post(dbHandler.insertTeacher);

module.exports = router;
