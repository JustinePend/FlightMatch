const express = require("express");

// departingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /departing.
const departingRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the departing flights.
departingRoutes.route("/departing").get(function (req, res) {
  let db_connect = dbo.getDb("flights");
  db_connect
    .collection("departing")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single departing flight by id
departingRoutes.route("/departing/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("departing")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new departing flight.
departingRoutes.route("/departing/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    number: req.body.number,
    time: req.body.time,
    baggage: req.body.baggage,
  };
  db_connect.collection("departing").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update an departing flight by id.
departingRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      number: req.body.number,
      time: req.body.time,
      baggage: req.body.baggage,
    },
  };
  db_connect
    .collection("departing")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete an departing flight
departingRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("departing").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = departingRoutes;
