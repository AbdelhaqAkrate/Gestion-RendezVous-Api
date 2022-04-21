import "bootstrap/dist/css/bootstrap.min.css";
import image from "./images/889d4a0b7e6bc070a096f00198340947-removebg-preview.png";
import Navbar from './Navbar';
import Login from "./login";
import {Link} from 'react-router-dom';
import React from "react";
import { createBrowserHistory } from "history";
import "./App.css";
const Home = () => {
    const history = createBrowserHistory();
     var dateNow = new Date();
      const tokenTime = new Date(localStorage['expire_at']* 1000 )
      const tokenexpiration=tokenTime.getTime() - dateNow.getTime()
     if(typeof localStorage["access_token"] !== 'undefined' && tokenexpiration>0)
      {
    return ( 
        <div>
             <Navbar />
        <div className="row">
            <div className="col-md-6 left-section">
                <h1 >Welcome To Medical Services Where You Can Trust</h1>
                <p>Here Is a Modern Way Of Booking Train Tickets Through An Online Train Booking Form That Provides You With The Convenience Of Buying Tickets And Checking Seat Availability.</p>
               	<Link to="/appointment">
					
					<a className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Book Now</a></Link> 
            </div>
            <div className="col-md-6 center">
                <img className="img-fluid img" src={image} alt="" />
            </div>
        </div>
        </div>
     );}
     else{
      localStorage.removeItem("access_token");
      localStorage.removeItem("IdUser");
      localStorage.removeItem("expire_at");
         
   history.push('/');
   return(
     <Login />
   )
     }
}
 console.log(localStorage['access_token'])
 
export default Home;