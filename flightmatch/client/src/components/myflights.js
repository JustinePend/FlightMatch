import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getUID} from "./login.js";
import { useNavigate } from "react-router";

const columnStyle = {
  textAlign: 'center',
  padding: '10px',
  border: '1px solid black',
  width: '100px'
};

const Record = (props) => (
  <tr>
    <td style={columnStyle}>{props.record.number}</td>
    <td style={columnStyle}>{props.record.date}</td>
    <td style={columnStyle}>{props.record.time}</td>
    <td style={columnStyle}>{props.record.baggage}</td>
    <td style={columnStyle}>
      <Link style={{padding: '5px'}} className="btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | 
      <Link style={{padding: '7px'}} className="btn-link" onClick={() => { props.deleteRecord(props.record._id);}}>
        Delete
      </Link> 
    </td>
  </tr>
);

export default function FlightList() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/arriving`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      //const newRecords = records.filter((el) => el.date === new Date());
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5001/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  //note
  function FlightList() {
    
    //The filter shows flights that match getUID
    let filteredFlights = records.filter(
      (flight) => flight.uid === getUID()
    );
    
    console.log("THE UID is: ", getUID());

    return filteredFlights.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }


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

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>My Flights</h3>
      
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th style={columnStyle}>Flight Number</th>
            <th style={columnStyle}>Arrival Date</th>
            <th style={columnStyle}>Arrival Time</th>
            <th style={columnStyle}>Bags</th>
            <th style={columnStyle}>Action</th>
          </tr>
        </thead>
        <tbody>{FlightList()}</tbody>
      </table>
    </div>
  );
}
