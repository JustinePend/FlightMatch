import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";


//Link to old navbar <h1> FlightMatch. Want to remove this route
//<NavLink className="nav-link" to="/">
  //<h1>FlightMatch</h1>
//</NavLink>

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h1>FlightMatch</h1>

        <div className="topbar">
          <ul className="navbar-nav ml-auto">
            <li className="home">
              <NavLink className="nav-link" to="/recordList">
                Home
              </NavLink>
            </li>
            <li className="create-flight">
              <NavLink className="nav-link" to="/create">
                Create Flight
              </NavLink>
            </li>
            <li className="profile">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="myflights">
              <NavLink className="nav-link" to="/myflights">
                My Flights
              </NavLink>
            </li>
            <li className="about">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="login">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
