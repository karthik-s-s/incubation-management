import React, { useState } from "react";
import { useEffect } from "react";
import "../booking/booking.css";
import {  Modal,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";


function Booking() {
  const navigate = useNavigate();
  const [sectionA, setSectionA] = useState(null);
  const [sectionB, setSectionB] = useState(null);
  const [sectionC, setSectionC] = useState(null);
  const [sectionD, setSectionD] = useState(null);
  const [approved, setApproved] = useState(null);
  const [slot, setSlot]         = useState(null);
  const [section, setSection]   = useState(null);
  const [booked, setBooked]     = useState("");
  


  /////////////////////MODAL////////////////////////////////
  const [show, setShow] = useState(false);

  useEffect(() => {
    const admintoken = localStorage.getItem("admintoken");
    if(admintoken) {
        const decodedAdmin =  jwt.decode(admintoken);
        if(!decodedAdmin){
            localStorage.removeItem("admintoken");
            navigate("/adminlogin", { replace: true }); 
        }else{
          navigate("/booking");
        }
    }else{
      navigate("/adminlogin", { replace: true }); 

    }
 
}, [])
  
  const handleClose = () => setShow(false);
  const handleShow = async (slotNo,section) => {
    const res = await fetch("http://localhost:9000/admin/users-approved");
    let approvedUser = await res.json();//full approved user 
    setSection(section) //section no
    setSlot(slotNo) //slotno
    setApproved(approvedUser) //full approved user
    setShow(true);
  }
  useEffect(() => {
    slots();
  }, [booked]);

  function checkA(data) {
    if (data.section === "A") {
      return data;
    }
  }
  function checkB(data) {
    if (data.section === "B") {
      return data;
    }
  }
  function checkC(data) {
    if (data.section === "C") {
      return data;
    }
  }
  function checkD(data) {
    if (data.section === "D") {
      return data;
    }
  }
  function book(userId) {
    console.log(slot);
    console.log(userId);
    console.log(section);
    fetch(`http://localhost:9000/admin/book/?slot=${slot}&userId=${userId}&section=${section}`).then((response) => {    
        console.log("ok");
        setBooked("booked")

    })

  }

  const slots = async () => {
    const res = await fetch("http://localhost:9000/admin/slots");
    const fullSlots = await res.json();
    let section_A = fullSlots.filter(checkA);
    setSectionA(section_A);
    let section_B = fullSlots.filter(checkB);
    setSectionB(section_B);
    let section_C = fullSlots.filter(checkC);
    setSectionC(section_C);
    let section_D = fullSlots.filter(checkD);
    setSectionD(section_D);
  
  };

  return (
    <div style={{overflowX: 'scroll'}}>
    <div className="d-flex w-100">
   {sectionA&& <>
      {sectionA.map((result) => {
        return <div  onClick={()=>result.isBooked ===false ?handleShow(result.slot,result.section):""} class={result.isBooked ===false ?"square_div":"square_divv"} ></div>;
      })}
    </>}
    </div>
    <div className="d-flex w-100">
   {sectionB&& <>
      {sectionB.map((result) => {
        return <div onClick={()=>result.isBooked ===false ?handleShow(result.slot,result.section):""} class={result.isBooked ===false ?"square_div":"square_divv"}></div>;
      })}
    </>}
    </div> <div className="d-flex w-100">
   {sectionC&& <>
      {sectionC.map((result) => {
        return <div onClick={()=>result.isBooked ===false ?handleShow(result.slot,result.section):""} class={result.isBooked ===false ?"square_div":"square_divv"}></div>;
      })}
    </>}
    </div> <div className="d-flex w-100">
   {sectionD&& <>
      {sectionD.map((result) => {
        return <div  onClick={()=>result.isBooked ===false ?handleShow(result.slot,result.section):""} class={result.isBooked ===false ?"square_div":"square_divv"}></div>
      })}
    </>}
    </div>

    {/* ///////////////////////////modaldata//////////////// */}
    <>
     
    
      <Modal show={show} onHide={handleClose}>
       

       
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {approved&&
    <Form.Select aria-label="Default select example" onChange={(e) =>{book(e.target.value)}} >
        {approved.map((user) =>{
            return(
            <>{console.log( user._id)}
              
              <option>Open this select menu</option>
              <option  value={user._id}>{user.forms.companyName}</option>
              
              </>  
            )
        })}
    
     
    </Form.Select>
    }
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}

      </Modal>

    </>
    </div>
  );
}

export default Booking;
