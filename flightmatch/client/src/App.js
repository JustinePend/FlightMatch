import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import About from "./components/about";
import Profile from "./components/profile";


const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
      <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recordList" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        
        <Route path="/about" element={<About />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
