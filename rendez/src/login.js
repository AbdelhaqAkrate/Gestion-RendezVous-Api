import React,{useState} from "react";

const Login = () => {
     const [password, setPassword] = useState('');

     const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
           
            console.log(password);
            // setPassword('');
        }
        catch(err){
       
        }
        
     }


    return ( 
        <div className="container">
            <div className="frame">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input type="password" name="password" placeholder="Your Code" onChange={(e)=>setPassword(e.target.value)} value={password} required />
                    <button>Login</button>
                       <span>
                    <a href="./Users.js">Sign up</a> 
                </span>
                </form>
            </div>
        </div>
     );
}
 
export default Login;