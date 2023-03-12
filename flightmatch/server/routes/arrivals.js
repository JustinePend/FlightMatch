const express = require("express");

// arrivingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /arriving.
const arrivingRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// // This section will help you get a list of all the arriving flights.
arrivingRoutes.route("/arriving").get(function (req, res) {
  
  let db_connect = dbo.getDb("flights");
  
  let date_ob = new Date();

// current date
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
curr_date = year + "-" + month + "-" + day;

  

  const filter = {'date': {'$gt': curr_date }};
  const sortf = {date: 1};
  db_connect.collection("arriving").find(filter).sort(sortf).toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });



// This section will help you get a single arriving flight by id
arrivingRoutes.route("/arriving/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("arriving")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new arriving flight.
arrivingRoutes.route("/arriving/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    number: req.body.number,
    date: req.body.date,
    time: req.body.time,
    baggage: req.body.baggage,
  };
  db_connect.collection("arriving").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update an arriving flight by id.
arrivingRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      number: req.body.number,
      date: req.body.date,
      time: req.body.time,
      baggage: req.body.baggage,
    },
  };
  db_connect
    .collection("arriving")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete an arriving flight
arrivingRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("arriving").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = arrivingRoutes;
