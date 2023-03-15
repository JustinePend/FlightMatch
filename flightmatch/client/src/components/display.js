import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {getUID} from "./login.js";


async function getProfile(uid){
  var x;
  await fetch("http://localhost:5001/profiles/getUID", {
    //replace with get id from UID
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({UID: uid})
  })
  .then((res) => res.json())
  .then((data) => {
    x=data;
    console.log("this is x ", x)
  });
  return x;
}

async function getFlightID(flightID){
  const response = await fetch(`http://localhost:5001/arriving/${flightID}`);
  console.log(response);
  return response;
}

async function doeverything(flightid){
  console.log("this is the flightid", flightid);
    var flightdata = await getFlightID(flightid);
    var record = await flightdata.json();
    console.log("this is the flight data", record);
    
    var profiledata = await getProfile(record.uid);
    console.log("this is the flight profile data", profiledata);
}

export default function Display() {
    
    const params = useParams();
    const navigate = useNavigate();
    const flightid = params.id.toString();
    doeverything(flightid);

    if (getUID() === 0)
    {
      return (
        <div>
          <h3> Invalid Credentials. Must be Logged in to view this page </h3>
          <h3> Use the Navigation Bar or Press the Button to Login</h3>
          <button onClick={() => navigate("/")}>Go to Login</button>
        </div>
      );
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
      <h1>
        Profile
      </h1>
    );
  }
  