import React, { useEffect, useState, } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
/////////////////////////////////////////datatables
//jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { data } from "jquery";


function AdminHome() {

  const navigate = useNavigate();
  // var modalUser;
  const [alluser, setAllUser] = useState([]);
  useEffect(() => {
    
   
      const admintoken = localStorage.getItem("admintoken");
      if(admintoken) {
          const decodedAdmin =  jwt.decode(admintoken);
          if(!decodedAdmin){
              localStorage.removeItem("admintoken");
              navigate("/adminlogin", { replace: true }); 
          }else{
            navigate("/admin",)
          }
      }else{
        navigate("/adminlogin", { replace: true }); 

      }
   
 

    displayAllData();
  }, [alluser]);


    ///////////////////////////////////////////MODAL////////////////
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modaldata, setdodaldata] = useState({});
  
    const handleShow = (data) => {
      const { forms } = data;
     
      setdodaldata(forms);
      setShow(true);
    };
///////////////////////////////////////////////////////////////////
  const addToPending = async (userId) => {
    fetch(`http://localhost:9000/admin/addpending/${userId}`).then(
      async (responce) => {
        let data = await responce.json();
        console.log(data);
        console.log("Successfully added to pending list");
        // setdata("deleted");
      }
    );
  };

  const addToApproved = async (userId) => {
    fetch(`http://localhost:9000/admin/addapprove/${userId}`).then(
      async (responce) => {
       //console.log(responce);
       //console.log("RESPONCE"); //  many object
        let data = await responce.json();
        //console.log(data);              //return statement only
        //console.log("DATA");
      })
  }

  const addToRejected = async (userId) => {
    fetch(`http://localhost:9000/admin/addreject/${userId}`).then(async(responce)=>{
      let data = await responce.json();

    })

  }

//////////////////NeEW APPLICANT
  function checkNew(data) {
   
    if (data.status === "new") {
      return data;
    }
  }
  function checkPending(data) {
    //pending,approved,rejected

    if (
      data.status === "pending"
      // ||
      //data.status === "approved" ||
     // data.status === "rejected"
    ) {
      return data;
    }
  }
  ///////////////////////////////////////////

  const displayAllData = async () => {
    const res = await fetch("http://localhost:9000/admin/users-list");
    const fullUser = await res.json();
    setAllUser(fullUser);
  };

  let statusNew = alluser.filter(checkNew);
  let statusPending = alluser.filter(checkPending);
  //initialize datatable
  $(document).ready(function() {
    setTimeout(function() {
      $("#example").DataTable();
    }, 1000);
  });

  return (
    <div >
      <div className="MainDiv  ">
        <div class="jumbotron text-center "></div>

        <div className="container">
          <h1>New Applicant List</h1>
          <table id="example" class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Company Mail</th>
                <th>open</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {statusNew.map((result, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{result.forms.companyName}</td>
                    <td>{result.forms.email}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(result)}
                      >
                        Open
                      </Button>
                    </td>
                    <td>
                      <a
                        onClick={() => addToPending(result._id)}
                        class="btn btn-warning text-white"
                      >
                        Add to pending
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ///////////////////////////////NEW application//////////////// */}

      <div className="MainDiv  ">
        <div class="jumbotron text-center "></div>

        <div className="container">
          <h1>Pending Applicant List</h1>
          <table id="example" class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Company Mail</th>
                <th>open</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {statusPending.map((result, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{result.forms.companyName}</td>
                    <td>{result.forms.email}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(result)}
                      >
                        Open
                      </Button>
                    </td>
                    <td>{result.status}</td>

                    <td>
                     
                        <a
                          onClick={() => addToApproved(result._id)}
                          class="btn btn-success text-white"
                        >
                          Approve
                        </a>
                     
                        <a
                        onClick={() => addToRejected(result._id)}
                        class="btn btn-danger text-white"
                      >
                        Reject
                      </a>
                 
                  
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* /////////////////////////////////////MODAL////////////////////// */}

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="container   col-md-6 card">
              <form>
                <h3>Application For Incubation</h3>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label>Name</label>
                    <input
                      disabled
                      value={modaldata.name}
                      type="text"
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address"
                      disabled
                      value={modaldata.address}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      disabled
                      value={data}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      disabled
                      value={modaldata.state}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Email"
                      disabled
                      value={modaldata.email}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label>Phone no</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone no"
                      disabled
                      value={modaldata.phone}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label>Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Company name"
                      disabled
                      value={modaldata.companyName}
                    />
                  </div>
                </div>
                <div className="mb-3 ">
                  <label>Describe Your Team and Background</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.teamAndBackground}
                  />
                </div>
                <div className="mb-3 ">
                  <label>Describe Your Company and Products</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.companyAndProducts}
                  />
                </div>
                <div className="mb-3 ">
                  <label>Describe the problem you are trying to solve</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.solvingProblem}
                  />
                </div>
                <div className="mb-3 ">
                  <label>What is unique about your solution </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.uniqueness}
                  />
                </div>
                <div className="mb-3 ">
                  <label>what is your value proposition for the customer</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    value={modaldata.valueProposition}
                    disabled
                  />
                </div>
                <div className="mb-3 ">
                  <label>
                    Who are your competitors and what is your competative
                    advantage ?
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.competitors}
                  />
                </div>
                <div className="mb-3 ">
                  <label>Explain your revenue model</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.revenueModel}
                  />
                </div>
                <div className="mb-3 ">
                  <label>
                    What is the potential market size of the product ?
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.marketSize}
                  />
                </div>
                <div className="mb-3 ">
                  <label>
                    How do you market or plan to market your product and
                    services{" "}
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.marketing}
                  />
                </div>
                <div>
                  <p>Types of incubation needed</p>
                  <div class="form-check mv-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      disabled
                      value="physical"
                      checked={modaldata.type === "physical" ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Physical Incubation
                    </label>
                  </div>
                  <div class="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      disabled
                      value="virtual"
                      checked={modaldata.type === "virtual" ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Virtual Incubation
                    </label>
                  </div>
                </div>
                <div className="mb-3 ">
                  <label>Upload a detailed bussiness proposal</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Details"
                    disabled
                    value={modaldata.bussinessProposal}
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
export default AdminHome;
