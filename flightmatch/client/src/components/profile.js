import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {getUID} from "./login.js";


export default function Profile() {
  useEffect(()=>{
    getProfile();
  },[])
  const [form, setForm] = useState({
    UID: "",
    name: "", //need to set name somewhere in signup or login
    email: "", 
    phone: "",
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
    
    const newEntry = { ...form }; //Get form data and set UID
    console.log("this is from calling getUID ", getUID());
    newEntry.UID = getUID(); 
    console.log("this is the form", newEntry)

    //Create profile with all elements
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

    setForm({ UID: "", phone:"", email: "", name: ""});
    navigate("/"); 
  }

  async function getProfile() {
    await fetch("http://localhost:5001/profiles/640e3c69ba5ea9840a41e279", {
      //replace with get id from UID
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setForm({ UID: data.UID, phone:data.phone, email: data.email, name:data.name});
    });
  }


  // This following section will display the form that takes the input from the user.
  return (

    <div>
      <h3>Profile</h3>
      <button className="btn btn-link"
        onClick={() => {
        }}>Yello</button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            maxLength="30"
            required
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            requried
            value={form.email}
            maxLength="254"
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="phone"
            className="form-control"
            id="tel"
            required
            maxLength="15"
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Profile"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
