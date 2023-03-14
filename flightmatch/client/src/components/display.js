import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
//import {getUID} from "./login.js";

export default function Display() {
    const [flight, setFlight] = useState({
      UID: "",  
      number: "",
      date: "",
      time: "",
      baggage: "",
      records: [],
    });

    const [profile, setProfile] = useState({
        UID: "",
        name: "",
        phone: "",
        email: ""
    });
    
    const params = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchFlight() {
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
  
        setFlight(record);
      }
  
      fetchFlight();

      return;
    }, [params.id, navigate]);

    useEffect(() => {
        async function fetchProfile() {
          const id = flight.UID;
          const response = await fetch(`http://localhost:5001/display/${id}`);
    
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
    
          setProfile(record);
        }

        fetchProfile();

        return;
        }, [params.id, navigate]);

      navigate("/recordList");
  
    // This following section will display the form that takes input from the user to update the data.
    return (
      <h1>
        Profile
      </h1>
    );
  }
  