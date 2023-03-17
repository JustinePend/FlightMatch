import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {getUID} from "./login.js";

const columnStyle = {
  textAlign: 'center',
  padding: '10px',
  border: '1px solid black',
  width: '100px'
};


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
        <h3>
          Profile and Contact Info
          <h5>
            <div>
              Name: {profdata.name}
            </div>
            <div>
              Email: {profdata.email}
            </div>
            <div>
              Phone Number: {profdata.phone}
            </div>
          </h5>
          
        </h3>
        <body>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
              <th style={columnStyle}>Flight Number</th>
            <th style={columnStyle}>Arrival Date</th>
            <th style={columnStyle}>Arrival Time</th>
            <th style={columnStyle}>Bags</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={columnStyle}>{fdata.number}</td>
                <td style={columnStyle}> {fdata.date}</td>
                <td style={columnStyle}>{fdata.time}</td>
                <td style={columnStyle}>{fdata.baggage}</td>
              </tr>
            </tbody>
          </table>
        </body>
        <div>
          <button style={{marginTop: 20}} onClick={() => navigate("/recordList")}>Go Back to Flight List</button>
        </div>

      </div>
      
    );
  }
  