let events = require("events");
let eventEmitter = new events.EventEmitter();

class Response extends events.EventEmitter {
  payload = [];
  success = false;
  message = "";

  setPayload(payload) {
    this.payload = payload;
  }

  setSuccess(success) {
    this.success = success;
  }

  setMessage(message) {
    this.message = message;
  }
}

module.exports = Response;
