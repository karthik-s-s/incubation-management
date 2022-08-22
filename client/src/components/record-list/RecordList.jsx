import React,{useEffect, useState} from 'react'
/////////////////////////////////////////datatables
//jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { } from "jquery";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";


function RecordList() {
    const [allRecord, setAllRecord] = useState(null)
    let allData;
    const navigate = useNavigate();
    useEffect(() => {
      const admintoken = localStorage.getItem("admintoken");
      if(admintoken) {
          const decodedAdmin =  jwt.decode(admintoken);
          if(!decodedAdmin){
              localStorage.removeItem("admintoken");
              navigate("/adminlogin", { replace: true }); 
          }else{
            navigate("/recordlist");
          }
      }else{
        navigate("/adminlogin", { replace: true });
      }
   
  }, [])
    const getAllData = async() =>{
        let res;
        res =await fetch('http://localhost:9000/admin/formsubmitteduser')
         allData = await res.json();
      
        setAllRecord(allData)
        

    }
    useEffect(() => {
        getAllData();
    }, [])
    

   

      //initialize datatable
  $(document).ready(function() {
    setTimeout(function() {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    <div>
      {allRecord&&
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
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { allRecord.map((result, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{result.forms.companyName}</td>
                    <td>{result.forms.email}</td>
                    <td>{result.status}</td>
                    <td>
                       {result.status === 'approved' ? <ProgressBar now={80}  />:result.status === 'rejected' ? <ProgressBar variant="danger" now={100} />:result.status === 'pending' ?<ProgressBar variant="warning" now={30} />:<ProgressBar now={0}  />}
                       

       


                    </td>
                  </tr>
                );
              })} 
            </tbody>
          </table>
        </div>
      </div>
}No Record
    </div>
  )
}

export default RecordList