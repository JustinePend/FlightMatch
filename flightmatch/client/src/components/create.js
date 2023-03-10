import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    number: "",
    date: "",
    time: "",
    baggage: "",
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

    setForm({ number: "", date: "", time: "", baggage: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
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
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="baggageOptions"
              id="hasBaggage"
              value="true"
              checked={form.baggage === "true"}
              onChange={(e) => updateForm({ baggage: e.target.value })}
            />
            <label htmlFor="hasBaggage" className="form-check-label">Baggage</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="baggageOptions"
              id="noBaggage"
              value="false"
              checked={form.baggage === "false"}
              onChange={(e) => updateForm({ baggage: e.target.value })}
            />
            <label htmlFor="noBaggage" className="form-check-label">No Baggage</label>
          </div> 
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
