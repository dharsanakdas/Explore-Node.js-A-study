let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/myapp", express.static("public"));

let userNames = ["Sehila", "kk", "Tom"];
let teacherNames = ["Tom", "Don", "Mon"];
let passedSrudents = ["Ann", "Chippy"];

let student1 = {
  name: "Sehila",
  age: 11,
  mark: 66,
  phone: 9992223233,
  color: "green"
};

let student2 = {
  name: "Darshana",
  age: 22,
  mark: 55,
  phone: 8882223233,
  color: "red"
};

let student3 = {
  name: "Jishnu",
  age: 44,
  mark: 77,
  phone: 8998986726,
  color: "blue"
};

let student4 = {
  name: "Reshma",
  age: 15,
  mark: 51,
  phone: 6662223233,
  color: "yellow"
};

let student5 = {
  name: "Ann",
  age: 16,
  mark: 61,
  phone: 4442223233,
  color: "gray"
};

let student6 = {
  name: "Chippy",
  age: 17,
  mark: 71,
  phone: 333223233,
  color: "pink"
};

let students = [];

students.push(student1);
students.push(student2);
students.push(student3);
students.push(student4);
students.push(student5);
students.push(student6);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Token",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Token",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/listStudents", function (req, res) {
  res.json(students);
});

// API to return total mark of all students
app.get("/averageMarkOfStudents", function (req, res) {
  let average = 0;
  let totalMark = 0;

  for (let i = 0; i < students.length; i++) {
    totalMark = totalMark + students[i].mark;
  }

  average = totalMark / students.length;
  res.send("Average of students " + average);
});

app.post("/registerStudent", function (req, res) {
  let student = req.body;
  students.push(student);
  res.send("Register Success");
});

app.delete("/deleteStudent", function (req, res) {
  let name = req.query.name;
  let index = -1;
  let found = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].name == name) {
      index = i;
      found = true;
    }
  }

  if (found) {
    students.splice(index, 1);
    res.send("Deleted success");
  } else {
    res.send("User not found " + name);
  }
});

app.put("/editStudent", function (req, res) {
  let student = req.body;
  let studentFound = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].name == student.name) {
      studentFound = true;
      students[i] = student;
    }
  }

  if (studentFound) {
    res.send("Student edited success");
  } else {
    res.send("Student record not found");
  }
});

app.get("/insertStudent", function (req, res) {
  let name = req.query.name;
  let age = req.query.age;
  let phone = req.query.phone;
  let mark = parseInt(req.query.mark);

  // check if all data is present before inserting
  console.log("name ", name);
  console.log("age ", age);
  console.log("mark ", mark);

  if (name && age && phone && mark) {
    if (isNaN(age)) {
      res.send("Please enter a proper number for age");
    } else {
      if (isNaN(mark)) {
        res.send("Please enter a proper number for mark");
      } else {
        // correct code
        let nameFound = false;
        for (let i = 0; i < students.length; i++) {
          if (students[i].name == name) {
            nameFound = true;
          }
        }

        if (nameFound) {
          res.send("Duplicate name, cannot insert : " + name);
        } else {
          let student = {
            name: name,
            age: age,
            mark: mark,
            phone: phone,
          };
          students.push(student);
          res.send("Success");
        }
        // correct code
      }
    }
  } else {
    res.send("Please send all the details");
  }
});

app.get("/listUsers", function (req, res) {
  res.json(userNames);
});

app.get("/listPassedStudents", function (req, res) {
  res.json(passedSrudents);
});

app.get("/listTeachers", function (req, res) {
  res.json(teacherNames);
});

app.get("/listAllMembers", function (req, res) {
  let allMembers = getAllMembers();
  res.json(allMembers);
});

function getAllMembers() {
  let allMembers = userNames.concat(teacherNames, passedSrudents);
  return allMembers;
}

app.get("/listOfNamesStartingWith", function (req, res) {
  console.log("req  querry", req.query);
  let character = req.query.ch.toLowerCase();

  let allMembers = getAllMembers();
  let resultArray = [];
  for (let i = 0; i < allMembers.length; i++) {
    let name = allMembers[i].toLowerCase();
    if (name.startsWith(character)) {
      resultArray.push(name);
    }
  }
  res.json(resultArray);
});

let server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
