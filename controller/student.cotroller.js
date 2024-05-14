const Students = require("./../database/models/Students");
const Teachers = require("./../database/models/Teachers");
let constants = require("./../shared/constants");
const Joi = require("joi");
let dbo = null;
let MongoClient = require("mongodb").MongoClient;
let Response = require("./../shared/Response");

let commonEvent = require("./../shared/commonEvent");

createConnection();

function createConnection() {
  MongoClient.connect(constants.DB_URL, function (err, db) {
    if (err) throw err;
    //console.log("Connection is created inside db handler");
    connection = db;
    dbo = db.db();
  });
}

//totalMarksOfStudents();

function totalMarksOfStudents() {
  Students.aggregate([
    { $group: { _id: null, total: { $sum: "$mark" } } },
  ]).then((result) => {
    console.log("result of students sum ", result[0].total);
  });
}

//averageMarks();

function averageMarks() {
  Students.aggregate([
    { $group: { _id: "$name", total: { $sum: "$mark" } } },
  ]).then((result) => {
    console.log("result ", result);
  });
}

//getAverageOfTeachers();

function getAverageOfTeachers() {
  Teachers.aggregate([
    { $group: { _id: "$place", total: { $sum: "$salary" } } },
  ]).then((result) => {
    console.log("result ", result);
  });
}

function getAllStudents(req, res) {
  commonEvent.emit("special", "Get all events API called");

  Students.find()
    .then((studentResult) => {
      let response = new Response();
      response.setSuccess(true);
      response.setMessage("All students fetched successfully");
      response.setPayload(studentResult);
      res.json(response);
    })
    .catch((error) => {
      let response = new Response();
      response.setSuccess(false);
      response.setMessage("Error while fetching student details");
      response.setPayload(error);
      res.json(response);
    });
}

function getNameAndMarkOfAllStudents(req, res) {
  dbo
    .collection(constants.STUDENTS_COLLECTION_NAME)
    .find({}, { projection: { name: 1, mark: 1, _id: 0 } })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}

function getStudentDetails(req, res) {
  dbo
    .collection(constants.STUDENTS_COLLECTION_NAME)
    .findOne({ name: req.query.name }, function (err, result) {
      if (err) throw err;
      console.log("result ", result);
      if (result) {
        let response = new Response();
        response.setSuccess(true);
        response.setMessage("Student detail fetched successfully");
        response.setPayload(result);
        res.json(response);
      } else {
        let r = new Response();
        r.setSuccess(false);
        r.setMessage("User not found");
        r.setPayload(null);
        res.json(r);
      }
    });
}

function editStudent(req, res) {
  let user = req.body;
  let userName = req.body.name;
  dbo
    .collection(constants.STUDENTS_COLLECTION_NAME)
    .updateOne({ name: userName }, { $set: user }, function (err, result) {
      if (err) throw err;
      console.log("result ", result);
      if (result.modifiedCount != 0) {
        res.send("Updated success");
      } else {
        res.send("No such user ");
      }
    });
}

function deleteStudent(req, res) {
  dbo
    .collection(constants.STUDENTS_COLLECTION_NAME)
    .deleteOne({ name: req.query.name }, function (err, result) {
      if (err) throw err;
      console.log("result ", result);
      if (result.deletedCount == 0) {
        res.send("Student not found");
      } else {
        res.send("delete succes");
      }
    });
}

function insertStudent(req, res) {
  const studentSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(18).max(100).required(),
    mark: Joi.number().min(0).max(100),
  });

  let validationResult = studentSchema.validate(req.body);
  if (validationResult.error) {
    let response = new Response();
    response.setSuccess(false);
    response.setMessage("Some fields are not available");
    response.setPayload(validationResult.error);
    res.json(response);
  } else {
    const student = new Students(req.body);
    student
      .save()
      .then((result) => {
        let response = new Response();
        response.setSuccess(true);
        response.setMessage("Sucessfully inserted");
        response.setPayload(result);
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
        let response = new Response();
        response.setSuccess(false);
        response.setMessage("Cound insert student");
        response.setPayload(err);
        res.json(response);
      });
  }
}

function getStudentDetailsInTable(req, res) {
  let uname = req.query.uname;

  Students.findOne({ name: uname })
    .then((result) => {
      if (result && result.name) {
        res.render("student_details", {
          name: uname,
          age: result.age,
          mark: result.mark,
        });
      } else {
        res.render("user_not_found", { name: uname });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

module.exports = {
  getAllStudents,
  getNameAndMarkOfAllStudents,
  getStudentDetails,
  editStudent,
  deleteStudent,
  insertStudent,
  getStudentDetailsInTable,
};
