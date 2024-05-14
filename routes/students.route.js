let express = require("express");
let router = express.Router();

let studentController =  require('./../controller/student.cotroller');

router.route("/allStudents").get(studentController.getAllStudents);

router.route("/getNameAndMarkOfAllStudents").get(studentController.getNameAndMarkOfAllStudents);

router.route("/getStudentDetails").get(studentController.getStudentDetails);

router.route("/getStudentDetailsInTable").get(studentController.getStudentDetailsInTable);

router.route("/editStudent").put(studentController.editStudent);

router.route("/deleteStudent").delete(studentController.deleteStudent);

router.route("/insertStudent").post(studentController.insertStudent);


module.exports = router;
