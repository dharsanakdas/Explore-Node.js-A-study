let Response = require("../shared/Response");
let Sales = require("./../database/models/Sales");

function getAllSales(req, res) {
  Sales.find()
    .then((result) => {
      console.log("result ", result);
      let response = new Response();
      response.setMessage("Sales fetched success");
      response.setSuccess(true);
      response.setPayload(result);
      res.json(response);
    })
    .catch((err) => {
      console.log("errr ", err);
      let response = new Response();
      response.setMessage("error");
      response.setSuccess(false);
      response.setPayload(err);
      res.json(response);
    });
}

function totalNoOfSales(req, res) {
  Sales.count().then((result) => {
    let response = new Response();
    response.setMessage("Length retrevied");
    response.setSuccess(true);
    response.setPayload(result);
    res.json(response);
  });
}

function getDistinctFlavours(req, res) {
  Sales.distinct("type").then((result) => {
    let response = new Response();
    response.setMessage("Distinct flavours retrevied");
    response.setSuccess(true);
    response.setPayload(result);
    res.json(response);
  });
}

function totalQuantitySold(req, res) {
  Sales.aggregate([
    { $group: { _id: null, total: { $sum: "$quantity" } } },
  ]).then((result) => {
    console.log("result ", result);
    res.json(result);
  });
}

function totalAmountOfSalesBasedOnType(req, res) {
  Sales.aggregate([
    {
      $project: {
        _id: 1,
        type: 1,
        state: 1,
        totalSale: { $multiply: ["$price", "$quantity"] },
      },
    },
    { $group: { _id: "$type", totalPrice: { $sum: "$totalSale" } } },
    { $sort: { totalPrice: 1 } },
  ]).then((result) => {
    console.log("result ", result);
    res.json(result);
  });
}

module.exports = {
  getAllSales,
  totalNoOfSales,
  getDistinctFlavours,
  totalQuantitySold,
  totalAmountOfSalesBasedOnType,
};
