import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from './Modal'


import Navbar from './Navbar';
import axios from "axios";
import React, { useEffect, useState }  from "react";
import { createBrowserHistory } from "history";
import { Navigate, useNavigate } from "react-router-dom";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import "./styles/appointement.css";
import Login from "./login";
const Appointement = () => {
const [appointement, setAppointement] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const history = createBrowserHistory();
const navigate = useNavigate();
  //fetch data using axios
     useEffect (() => {
        axios.get("http://localhost/RendezVous/rendezBack/rendez/getAppointements")
        .then(result=>
            {
            setAppointement(result.data) 
            })
            .catch(err =>{
                console.log(err)
            })
    })

    //function to check if token expired
      var dateNow = new Date();
      const tokenTime = new Date(localStorage['expire_at']* 1000 )
      const tokenexpiration=tokenTime.getTime() - dateNow.getTime()
      


    function GetAppointement(id,h)
    {
      console.log(id);
      console.log(localStorage['IdUser']);
     
    }
    
 if(typeof localStorage["access_token"] !== 'undefined' && tokenexpiration>0)
      {
        
      
    return ( 
      // if(localStorage["access_token"]!=id)
    

    <div className="feild">





      {modalOpen && <Modal setOpenModal={setModalOpen} />}

      <Navbar />
      <div className="container">
        <h2>Doctor Schedule</h2>
         <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
               {appointement.map(rdv=>(
              <tr key={rdv.idCreanu}>
                <td>{rdv.idCreanu}</td>
                <td>{rdv.startTime}</td>
                <td>{rdv.endTime}</td>
                <td>{rdv.day}</td>
                <td><Button onClick={()=>GetAppointement(rdv.idCreanu,setModalOpen(true))}>Get</Button></td>
              </tr>))}
            </tbody>
        </Table>
      </div>
    </div> 
     );
}
else{
   history.push('/');
   return(
     <Login />
   )
}
 }
 
export default Appointement;