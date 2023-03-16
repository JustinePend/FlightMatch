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
      <button className="btn btn-link">
         <Link className="btn btn-link" to={`/display/${props.record._id}`}>Display Profile</Link>
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

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
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}