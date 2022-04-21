import { Form,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import './styles/Modal.css'
function GetAppointement({Creanu}){
    const [sujet, setSujet] = useState('');
    const [message, setMessage] = useState('');
 const inputchangehandler = (event) => {
    setSujet(event.target.value)
  }
   const add = async (e) => {
     e.preventDefault();
    console.log(Creanu.idCreanu);
    console.log(localStorage['IdUser']);
    console.log(sujet)
      axios.post("http://localhost/RendezVous/rendezBack/rendez/reserveAppointement",JSON.stringify({'reason':sujet,'idUser':localStorage['IdUser'],'idCreanu':Creanu.idCreanu}))
        .then(Response=>{
            console.log(Response.status);
            console.log();
            setMessage(Response.data.message);
        })
    // console.log(JSON.stringify({'reason':sujet,'idUser':localStorage['IdUser'],'idCreanu':Creanu.idCreanu}));
    // setMessage("success");
}

    return ( 
         <Form onSubmit={add}>
            { message !== '' ? <div className="message">{message} </div> : null }
              <Form.Group>
                  <input type="text" value={Creanu.idCreanu} hidden/>
              </Form.Group>
              <Form.Group>
                 <p>Time : {Creanu.startTime} - {Creanu.endTime}</p>
              </Form.Group>
              <Form.Group>
                  <p>Day : {Creanu.day}</p>
              </Form.Group>
             <Form.Group >
                <Form.Control
                    type="text"
                    placeholder="Reason .."
                    value = {sujet} 
                    onChange={inputchangehandler}
                    required
                />
              </Form.Group>
             <Form.Group>
                 <Button variant="success" type="submit" block>Get Appointement</Button>
             </Form.Group>
           
         </Form>

     );
}
 
export default GetAppointement;