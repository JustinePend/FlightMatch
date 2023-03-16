import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getUID} from "./login.js";
import { useNavigate } from "react-router";
import DatePicker from 'react-date-picker';

const Record = (props) => (
  <tr>
    <td>{props.record.number}</td>
    <td>{props.record.date}</td>
    <td>{props.record.time}</td>
    <td>{props.record.baggage}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button> |
      <Link className="btn btn-link" to={`/display/${props.record._id}`}>Display Profile</Link>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/arriving/`);

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



  //Variables for dates for list of flights
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (val) => {
    setSelectedDate(val);

    const newRecords = records.filter((el) => el.date === val);
    setRecords(newRecords);
  };

  let date_ob = new Date();
  let day = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = (date_ob.getFullYear()+1);
  let curr_date_1 = year + "-" + month + "-" + day;
  //const [filter, setFilter] = useState (new Date());
  //{'date': {'$gt': curr_date }}
  //.filter((flight) => flight.date === val)

  let yesterday = new Date ();
  yesterday.setDate(yesterday.getDate() - 1);

  // This method will map out the records on the table
  //note
  function RecordList() {
    
    let filteredFlights = records.filter(
      (flight) => flight.uid !== getUID()
    );
      //The filter shows flights that don't match getUID

    if (getUID() === 0)
    {
      filteredFlights = records.filter(
        (flight) => flight.uid === -1
      );
    }
    //Since no UID can be negative, this shows no flights
    
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
  const [value, onChange] = useState(new Date());

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
      <h3>Flight List</h3>
      <div className="form-group">
        <label htmlFor="date">Search For Date of Flight:          
        </label>
        <DatePicker 
          value={selectedDate} 
          onChange={handleDateChange}
          minDate={new Date(yesterday)}
          maxDate={new Date(curr_date_1)}
        />
      </div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Baggage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{RecordList()}</tbody>
      </table>
    </div>
  );
}
