let MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
let constants = require("./../shared/constants");
let dbo = null;
let commonEvent = require('./../shared/commonEvent')

const Teachers = require("./models/Teachers");
const Students = require("./models/Students");

connectMongoose();

function connectMongoose() {
  mongoose.connect(constants.DB_URL, { useNewUrlParser: true }).then(() => {
    //Connecconsole.log("Mongoose connected");
    commonEvent.emit("secret", "Mongoose is connected")
  });
}

function getTeachersAndStudents(req, res) {
  let response = {
    students: [],
    teachers: [],
  };
  Teachers.find().then((resultTeachers) => {
    response.teachers = resultTeachers;
    Students.find().then((resultStudents) => {
      response.students = resultStudents;
      res.json(response);
    });
  });
}

function getAllTeachers(req, res) {
  console.log("one");
  let result;
  Teachers.find()
    .then((ress) => {
      console.log("two");
      res.json(ress);
      result = ress;
    })
    .catch((e) => {
      console.log("Error ", e);
    });

  console.log("three ", result);
}

async function getTeachersAndStudentsAsynchAwait(req, res) {

  let teachersResult = await Teachers.find();
  let studentsResult = await Students.find();

  let response = {
    students: studentsResult,
    teachers: teachersResult
  }

  res.json(response);
}

async function getAllTeachersAsynchAwait(req, res) {
  console.log("one 1");
  try {
    let result = await Teachers.find();
    console.log("two 2 ", result);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
}

function insertTeacher(req, res) {
  const teacher = new Teachers(req.body);
  if (req.body.name && req.body.age && typeof req.body.married == "boolean") {
    teacher.save().then((result) => {
      res.json(result);
    });
  } else {
    res.send("Please send all the fields");
  }
}

module.exports = {
  getAllTeachers,
  insertTeacher,
  getAllTeachersAsynchAwait,
  getTeachersAndStudents,
  getTeachersAndStudentsAsynchAwait
};
