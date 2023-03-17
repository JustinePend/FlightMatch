const express = require("express");

// profilesRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /profiles.
const profilesRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the profiles.
profilesRoutes.route("/profiles").get(function (req, res) {
  let db_connect = dbo.getDb("flights");
  db_connect
    .collection("profiles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single profile by id
profilesRoutes.route("/profiles/getUID").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { "UID": req.body.UID};
  db_connect
      .collection("profiles")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new profile.
profilesRoutes.route("/profiles/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    UID: req.body.UID,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  db_connect.collection("profiles").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a profile by id.
profilesRoutes.route("/profiles/update").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.body.profileid )};
  let newvalues = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
  };

  db_connect
    .collection("profiles")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a profile.
profilesRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("profiles").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = profilesRoutes;
