import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import { FaEdit  } from "react-icons/fa";
import { MdFreeCancellation } from "react-icons/md";
import GetAppointement from "./Modal";
import Navbar from './Navbar';
import axios from "axios";
import React, { useEffect, useState }  from "react";
import { createBrowserHistory } from "history";
import { Navigate, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./styles/appointement.css";
import Login from "./login";
// import { Modal } from "bootstrap";
const MyAppontement = () => {
const [reserved, setReserved] = useState([]);
const [show, setShow] = useState(false);
const handleShow = () =>setShow(true);
const handleClose = () =>setShow(false)
const [message, setMessage] = useState('');
const [Creanu, setCreanu] = useState([]);
const history = createBrowserHistory();
const navigate = useNavigate();
  //fetch data using axios
     useEffect (() => {
        axios.get(`http://localhost/RendezVous/rendezBack/rendez/reservedAppointement/${localStorage["IdUser"]}`)
        .then(result=>
            {
            setReserved(result.data) 
            })
            .catch(err =>{
                console.log(err)
            })
    })

    //function to check if token expired
      var dateNow = new Date();
      const tokenTime = new Date(localStorage['expire_at']* 1000 )
      const tokenexpiration=tokenTime.getTime() - dateNow.getTime()
      


    function Get(id,handle)
    {
      console.log(id);
      console.log(localStorage['IdUser']);
        fetch(`http://localhost/RendezVous/rendezBack/rendez/getCreneau/${id}`)
        .then(result=>result.json())
        .then((data)=>{
                // console.log(data)
                setCreanu(data) 
              
            })
            .catch(err =>{
                console.log(err)
            })
     
    }

    function Delete(id) {
      axios.get(`http://localhost/RendezVous/rendezBack/rendez/deleteAppointement/${id}`)
        .then(Response=>{
            console.log(Response.status);
            console.log();
            setMessage(Response.data.message);
        })
    }



    
 if(typeof localStorage["access_token"] !== 'undefined' && tokenexpiration>0)
      {
        
      
    return ( 
      // if(localStorage["access_token"]!=id)
    

    <div className="feild">

      <Modal show={show}>
        <Modal.Header>
            <Modal.Title>
                Get Appointement
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <GetAppointement Creanu={Creanu}/>  
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      

      <Navbar />
      <div className="container">
           { message !== '' ? <div className="message">{message}</div> : null }
        <h2>Doctor Schedule</h2>
         <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>Sujet</th>
                <th>start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th colspan="2">Action</th>
              </tr>
            </thead>
            <tbody>
               {reserved.map(rdv=>(
              <tr key={rdv.idRDV}>
                <td>{rdv.sujetRDV}</td>
                <td>{rdv.startTime}</td>
                <td>{rdv.endTime}</td>
                <td>{rdv.day}</td>
                <td><Button variant="info" onClick={()=>{ Get(rdv.idCreanu,handleShow);handleShow();}}>< FaEdit /></Button></td> 
                <td><Button variant="danger" onClick={()=>{ Delete(rdv.idRDV)}}><MdFreeCancellation/></Button></td>
              </tr>))}
            </tbody>
        </Table>
      </div>
    </div> 
     );
}
else{
   history.push('/');
   	localStorage.removeItem("access_token");
		localStorage.removeItem("IdUser");
		localStorage.removeItem("expire_at");
   return(
     <Login />
   )
}
 }
 
export default MyAppontement;