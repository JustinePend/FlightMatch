import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import DatePicker from 'react-date-picker';
import {getUID} from "./login.js";

const Record = (props) => (
  <tr>
    <td>{props.record.number}</td>
    <td>{props.record.date}</td>
    <td>{props.record.time}</td>
    <td>{props.record.baggage}</td>
    <td>
      <Link className="btn-link" to={`/display/${props.record._id}`}>Display User's Profile</Link>
    </td>
  </tr>
);

export default function RecordList() {
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
  function recordList() {
    
    const filteredFlights = records.filter(
      (flight) => flight.date === selectedDate.toISOString().slice(0, 10)
    );

    let filteredFlights2 = filteredFlights.filter(
      (flight) => flight.uid !== getUID()
    );

    return filteredFlights2.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  function flightList() {
    const filteredFlights = records.filter(
      (flight) => flight.date === selectedDate.toISOString().slice(0, 10)
    );

    let filteredFlights2 = filteredFlights.filter(
      (flight) => flight.uid === getUID()
    );

    return filteredFlights2.map((record) => {
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
      <h5> Other People's Flights: </h5>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Bags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
      <h5> My flights: </h5>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Bags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{flightList()}</tbody>
      </table>        
    </div>
  );
}