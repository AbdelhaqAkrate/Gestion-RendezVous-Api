import React,{useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/login.css";
const Login = () => {
    const navigate = useNavigate();
     const [password, setPassword] = useState('');
     const [redirect,setRedirect] = useState(false)
    const login = async (e) => {
        e.preventDefault();
    console.log("hello");

    try {
        //  var qs = require('qs')
        let response = await axios.post('http://localhost/RendezVous/rendezBack/rendez/login',JSON.stringify({'id':password}));
        console.log(JSON.stringify({'id':password}));
            console.log(response.data)
        if(response.status === 200 && response.data.jwt && response.data.expire){
            let jwt = response.data.jwt;
            console.log(jwt)
            let expire_at = response.data.expire;
            let IdUser = response.data.IdUser;
            setRedirect(true);
            localStorage.setItem("access_token", jwt);
            localStorage.setItem("expire_at", expire_at);
            localStorage.setItem("IdUser", IdUser)
            console.log(localStorage);
            navigate('/Home');
        }
        else{
            navigate('/');
        }


    } catch(e){
        console.log(e);
        console.log("error")
    }
}

    return ( 
        
        <div className="container">
            <div className="frame">
                <form onSubmit={login}>
                    <div className="header">
                         <h2>Login</h2>
                    </div>
                    
                    <div className="block">
                        <h2>Welcome Back</h2>
                         <input type="password" name="password" placeholder="Your Code" onChange={(e)=>setPassword(e.target.value)} value={password} required />
                    </div>
                    <div className="footer">
                        <button className="button">Login</button>
                         <span className="link">
                            <a href="./Users.js">Sign up</a> 
                       </span>
                    </div>
                    
                      
                </form>
            </div>
        </div>
     );
}
 
export default Login;