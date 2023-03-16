import React, { useState } from "react";
import { useNavigate } from "react-router";
import {getUID} from "./login.js";

export default function Create() {
  const [form, setForm] = useState({
    number: "",
    date: "",
    time: "",
    baggage: "",
    uid: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    
    // When a post request is sent to the create url, we'll add a new arriving flight to the database.
    const newEntry = { ...form };
    newEntry.uid = getUID(); 

    console.log(newEntry);

    await fetch("http://localhost:5001/arriving/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ number: "", date: "", time: "", baggage: "", uid: "", });
    navigate("/recordList");
  }

  // This following section will display the form that takes the input from the user.
  
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
  return (
    <div>
      <h3>Enter Flight Information</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="number">Flight Number (ex. UA1234)</label>
          <input
            type="text"
            className="form-control"
            id="number"
            value={form.number}
            required
            maxLength="6"
            pattern="[A-Z][A-Z]?\d{1,4}$"
            onChange={(e) => updateForm({ number: e.target.value })}
          />
        </div>
        <div className="form-group">
        <label htmlFor="date">Date of Arrival</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={form.date}
            required
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time of Arrival</label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={form.time}
            required
            onChange={(e) => updateForm({ time: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="baggage">Number of Bags</label>
            <select
              type="number"
              className="form-control"
              id="baggage"
              value={form.baggage}
              required
              onChange={(e) => updateForm({ baggage: e.target.value })}
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>   
          </select>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Flight"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
