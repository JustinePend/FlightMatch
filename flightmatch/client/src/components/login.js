import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [form, setForm] = useState({
    UID: "",
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

    //TODO: probably have to change stuff here for backend!
    await fetch("http://localhost:5001/profiles/add", {
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
      <h3>Log in with UCLA UID</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="UID">UID</label>
          <input
            type="tel"
            className="form-control"
            id="UID"
            value={form.UID}
            requried
            maxLength="9"
            pattern="\d*"
            title="UID must contain only integers"
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
