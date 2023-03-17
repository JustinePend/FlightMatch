import React, { useState } from "react";
import { useNavigate } from "react-router";

var currUID=0;

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
    console.log("this is data", data);
    if(data==null){
      return null;
    }else{x = data._id};
  });
  return x;
}

export function getUID(){ //Function to access UID variable
  return currUID;
}

export default function Login() {
  const [form, setForm] = useState({
    UID: "",
  });
  const navigate = useNavigate();

  //If user is already logged in
  if (getUID() !== 0)
  {
    function logout() {
      currUID = 0;
      navigate("/")
    }
    return (
      <div>
        <h3> 
          You are already logged in! 
          Thank you for using FlightMatch!
        </h3>
        <p style={{fontSize: '20px', marginTop: 20}}>
          If you would like to log out, press this button and you will be prompted to login again.
        </p>
        <form>
          <div className="form-group">
          <input
            onClick={logout}
            type="submit"
            value="Log Out"
            className="btn btn-primary"
          />
          </div>
        </form>
      </div>
    );
  }

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

    //Set UID variable to accessed elsewhere
    currUID = form.UID;

    let y = await getProfile(currUID);

    console.log("this is the value of y ", y);

    //Clear Form
    setForm({ UID: ""});
    
    if(y == null){
      navigate("/profile");
    }
    else{
      navigate("/recordList")
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h1> Welcome to UCLA Flight Match- Log in to Get Started </h1>
      <h3>Please Log in with UCLA UID</h3>
      <form onSubmit={onSubmit} className="form-inline">
        <div className="form-group">
          <label htmlFor="UID">UID</label>
          <input
            type="tel"
            className="form-control"
            id="UID"
            value={form.UID}
            required
            minLength="9"
            maxLength="9"
            width="aut"
            pattern="\d*"
            title="UID must contain only integers"
            onChange={(e) => updateForm({ UID: e.target.value })}
            size={"10"}
          />
          <input
            type="submit"
            value="Sign In"
            className="btn btn-primary"
          />
        </div>
        {/* <div className="form-group">
          
        </div> */}
      </form>
    </div>
  );
}
