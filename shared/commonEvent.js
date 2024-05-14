let events = require("events");
let eventEmitter = new events.EventEmitter();

let fs = require("fs");
const Sales = require("../database/models/Sales");

eventEmitter.on("secret", function (val) {
  console.log("event is triggered ", val);
  fs.appendFile("logs.txt", "\n" + val + " at " + new Date(), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
});

eventEmitter.on("special", function (data) {
    console.log("**************** special ***********************");
    console.log(data);
    console.log("**************** special ***********************");
})

module.exports = eventEmitter;