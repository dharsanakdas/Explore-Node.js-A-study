let express = require("express");
let app = express();
app.set("view engine", "ejs");
let studentName = "Sehila";

let commonEvent = require("./shared/commonEvent");

commonEvent.emit("secret", "Program started");

// setTimeout(() => {
//   let student = {
//     name: "kk",
//     mark: 123,
//   };
//   eventEmitter.emit("secret", "Heloo");
// }, 2000);

// eventEmitter.emit("secret", "Bye");

let db = require("./database/db");
let bodyParser = require("body-parser");
app.use(bodyParser.json());
const constants = require("./shared/constants");
var indexRouter = require("./routes/index.route");

app.get("/samplePage", (req, res) => {
  // The render method takes the name of the HTML
  // page to be rendered as input.
  // This page should be in views folder in
  // the root directory.
  // We can pass multiple properties and values
  // as an object, here we are passing the only name
  res.render("index", { name: studentName , age: 20 });
});

app.get("/testPage", (req, res) => {
  res.render("test", { name: studentName , mark: 77 });
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

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

app.use("/", indexRouter);

// app.get("/getTeachersAndStudents", dbHandler.getTeachersAndStudents);

// app.get(
//   "/getTeachersAndStudentsAsynchAwait",
//   dbHandler.getTeachersAndStudentsAsynchAwait
// );

// app.get("/", function (req, res) {
//   res.end("App ready");
// });

let server = app.listen(constants.PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  //console.log("Example app listening at http://%s:%s", host, port);
});
