import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    number: "",
    date: "",
    time: "",
    baggage: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5001/arriving/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Arriving flight with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedFlight = {
      number: form.number,
      date: form.date,
      time: form.time,
      baggage: form.baggage,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5001/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedFlight),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Flight Number: </label>
          <input
            type="text"
            className="form-control"
            id="number"
            value={form.number}
            onChange={(e) => updateForm({ number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Arrival Date: </label>
          <input
            type="text"
            className="form-control"
            id="date"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Arrival Time: </label>
          <input
            type="text"
            className="form-control"
            id="time"
            value={form.time}
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
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
