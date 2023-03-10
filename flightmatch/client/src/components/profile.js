import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function DisplayProfile() {
  const [form, setForm] = useState({
    NAME: "", //need to set name somewhere in signup or login
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

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newEntry = { ...form };

    //TODO: probably have to change stuff here for backend!
    await fetch("http://localhost:5001/record/add", {
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

    setForm({ UID: ""});
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>NAME</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="UID">UID</label>
          <input
            type="number"
            className="form-control"
            id="UID"
            value={form.UID}
            required
            minlength="9"
            maxlength="9"
            onChange={(e) => updateForm({ UID: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Sign In"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
