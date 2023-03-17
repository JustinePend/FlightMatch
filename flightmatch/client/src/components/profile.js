import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {getUID} from "./login.js";


export default function Profile() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=> {
    getProfile(getUID());
  },[params.id], navigate)
  const [form, setForm] = useState({
    UID: "",
    name: "", //need to set name somewhere in signup or login
    email: "", 
    phone: "",
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function createProfile(profile){
    await fetch("http://localhost:5001/profiles/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(profile),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  }

  async function getProfileID(uid){
    var x;
    await fetch("http://localhost:5001/profiles/getUID", {
      //replace with get id from UID
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({UID: uid})
    })
    .then((res) => res.json())
    .then((data) => {
      x=data._id;
    });
    return x;
  }


  async function editProfile(profile){
    var id = await getProfileID(profile.UID);
    profile.profileid = id;

    await fetch(`http://localhost:5001/profiles/update`, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

 async function getProfile(uid){
    var x;
    await fetch("http://localhost:5001/profiles/getUID", {
      //replace with get id from UID
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({UID: uid})
    })
    .then((res) => res.json())
    .then((data) => {
      x=data;
      if(data != null) {
        setForm({ UID: data.UID, phone:data.phone, email: data.email, name:data.name});
      }
    });
    return x;
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.

    const entry = { ...form }; //Get form data and set UID
    entry.UID = getUID(); 
    let y = await getProfile(getUID());
    //Create profile with all elements
    if(y == null){
      console.log("here at create profile")
      createProfile(entry);
    }
    else{
      editProfile(entry);
    }
  
    setForm({ UID: "", phone:"", email: "", name: ""});
    navigate("/recordList"); 
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

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Profile of UID </h3>
      <h5 style={{marginTop: 20}}>Your UID: {getUID()}</h5>
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
            required
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
            minLength="10"
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
