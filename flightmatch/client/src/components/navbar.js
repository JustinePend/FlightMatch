import React from "react";
import {getUID} from "./login.js";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="nav-link" to="/">
          <h1>FlightMatch</h1>
        </NavLink>

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
              <NavLink className="nav-link" to={"/profile"}>
                Profile
              </NavLink>
            </li>
            <li className="groups">
              <NavLink className="nav-link" to="/">
                View Groups
              </NavLink>
            </li>
            <li className="about">
              <NavLink className="nav-link" to="/about">
                About
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
