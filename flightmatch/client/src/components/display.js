import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
//import {getUID} from "./login.js";



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



var profiledata;




export default function Display() {
    
    const params = useParams();
    const navigate = useNavigate();

    const [profdata, setProf] = useState({
      UID: "",
      name: "",
      email: "",
      phone: "",
    });


    useEffect(() => {

      async function Doeverything(flightid){

        console.log("this is the flightid", flightid);
          var flightdata = await getFlightID(flightid);
          var record = await flightdata.json();
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
    // This following section will display the form that takes input from the user to update the data.
    return (
      <div>
        <h1>
          Profile
          <div>
          name: {profdata.name}
          </div>
          <div>
            email: {profdata.email}
          </div>
          <div>
            phone number: {profdata.phone}
          </div>
          
        </h1>
          
      </div>
      
    );
  }
  