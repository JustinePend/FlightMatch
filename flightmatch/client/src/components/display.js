import React, { useState, useEffect } from "react";
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
    //console.log("this is x ", x)
  });
  return x;
}

async function getFlightID(flightID){
  const response = await fetch(`http://localhost:5001/arriving/${flightID}`);
  console.log(response);
  return response;
}

var profiledata;
var record;

export default function Display() {
    
    const params = useParams();
    const navigate = useNavigate();

    const [profdata, setProf] = useState({
      UID: "",
      name: "",
      email: "",
      phone: "",
    });

    const [fdata, setFdata] = useState({
      number: "",
      date: "",
      time: "",
      baggage: "",
      uid: "",
    });

    useEffect(() => {

      async function Doeverything(flightid){

        console.log("this is the flightid", flightid);
          var flightdata = await getFlightID(flightid);
          record = await flightdata.json();
          setFdata(record);
          console.log("this is the flight data", record);
          
          profiledata = await getProfile(record.uid);
          setProf(profiledata);

          console.log("this is the flight profile data", profdata);
          //return profiledata;
      }
      const flightid = params.id.toString();
    Doeverything(flightid);

    console.log("do everything pls work", profdata);
    },[params.id, navigate]);


    console.log("This is from do everything", profdata);
    const flightid = params.id.toString();

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
      <div>
        <h1>
          Profile
          <h3>
            <div>
              Name: {profdata.name}
            </div>
            <div>
              Email: {profdata.email}
            </div>
            <div>
              Phone Number: {profdata.phone}
            </div>
          </h3>
          
        </h1>
        <body>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Arrival Date</th>
                <th>Arrival Time</th>
                <th>Baggage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {fdata.number}</td>
                <td> {fdata.date}</td>
                <td> {fdata.time}</td>
                <td> {fdata.baggage}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </div>
      
    );
  }
  