import React from 'react';
import Appointement from './Appointement';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import {Navigate} from "react-router-dom"
import Login from './login';
// import Navbar from './Navbar';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route path="/Home" element={<Home/>}/>
        <Route path="/appointment" element={<Appointement/>}/>
        <Route path="*" element={<Navigate to ="/" />}/>


      </Routes>
      </Router>
    </div>
  );
}

export default App;
