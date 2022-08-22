import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from "jsonwebtoken";



function UserHome() {
    const [form, setForm] = useState({})
    const navigate=useNavigate()
    useEffect(() => {
        const usertoken = localStorage.getItem("usertoken");
        if (usertoken) {
          const decodedUser = jwt.decode(usertoken);
          if (!decodedUser) {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          } else {
            navigate("/userhome");
          }
        }else{
            navigate("/", { replace: true });
        }
      
    }, [])
    

    async function submitApplication(event) {
        event.preventDefault()
        let userToken = localStorage.getItem('usertoken')
        let decodedUser =  jwt.decode(userToken);
         console.log(decodedUser.userId);// full user details

        const response = await fetch(`http://localhost:9000/submit-application/${decodedUser.userId}`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })

        const data = await response.json()
        console.log(data);
        if(data.status === 'Duplicate form'){
            alert('Duplicate form submitted')
        }
        if (data.status === 'success') {
            navigate('/userhome')
            alert(" Application submitted Successfully ")
        } if(data.status === 'error'){
            alert('Something went wrong please try again')

        }
            
        
    }

  return (
    <div >
        <div className="container mt-5 mb-5 p-4  col-md-6 card ">
            <form onSubmit={submitApplication} >
                <h3>Application For Incubation</h3>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Name</label>
                        <input
                            value={form.name}
                            type="text"
                            className="form-control"
                            required
                            placeholder="First name"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="mb-3 col-6">
                        <label>Address</label>
                        <input
                            value={form.address}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Enter Address"
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>City</label>
                        <input
                            value={form.city}
                            type="text"
                            className="form-control"
                            required
                            placeholder="City"
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                    </div>

                    <div className="mb-3 col-6">
                        <label>State</label>
                        <input
                            value={form.state}
                            type="text"
                            className="form-control"
                            required
                            placeholder="State"
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Email</label>
                        <input
                            value={form.email}
                            type="email"
                            className="form-control"
                            required
                            placeholder="Enter Email"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-3 col-6">
                        <label>Phone no</label>
                        <input
                            value={form.phone}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Enter Phone no"
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Company Name</label>
                        <input
                            value={form.companyName}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Enter Company name"
                            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        />
                    </div>

                    <div className="mb-3 mt-4 col-6">
                        <input type="file" />
                    </div>
                </div>
                <div className="mb-3 ">
                    <label>Describe Your Team and Background</label>
                    <textarea
                        value={form.teamAndBackground}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, teamAndBackground: e.target.value })}
                    />
                </div>
                <div className="mb-3 ">
                    <label>Describe Your Company and Products</label>
                    <textarea
                        value={form.companyAndProducts}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, companyAndProducts: e.target.value })}
                    />
                </div>
                <div className="mb-3 ">
                    <label>Describe the problem you are trying to solve</label>
                    <textarea
                        value={form.solvingProblem}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, solvingProblem: e.target.value })}

                    />
                </div>
                <div className="mb-3 ">
                    <label>What is unique about your solution </label>
                    <textarea
                        value={form.uniqueness}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Detailsl"
                        onChange={(e) => setForm({ ...form, uniqueness: e.target.value })}

                    />
                </div>
                <div className="mb-3 ">
                    <label> what is your value proposition for the customer</label>
                    <textarea
                        value={form.valueProposition}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, valueProposition: e.target.value })}

                    />
                </div>
                <div className="mb-3 ">
                    <label>Who are your competitors and what is your competative advantage ?</label>
                    <textarea
                        value={form.competitors}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, competitors: e.target.value })}

                    />
                </div>
                <div className="mb-3 ">
                    <label>Explain your revenue model</label>
                    <textarea
                        value={form.revenueModel}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, revenueModel: e.target.value })}

                    />
                </div>
                <div className="mb-3 ">
                    <label>What is the potential market size of the product ?</label>
                    <textarea
                        value={form.marketSize}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, marketSize: e.target.value })}

                    />
                </div>
                <div className="mb-3 ">
                    <label>How do you market or plan to market your product and services </label>
                    <textarea
                        value={form.marketing}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                        onChange={(e) => setForm({ ...form, marketing: e.target.value })}

                    />
                </div>
                <div>
                    <p>Types of incubation needed</p>
                    <div class="form-check mv-3" >
                        <input required className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='physical'
                            onClick={(e) => setForm({ ...form, type: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Physical Incubation
                        </label>
                    </div>
                    <div class="form-check mb-4">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  value= 'virtual'
                            onClick={(e) => setForm({ ...form, type: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Virtual Incubation
                        </label>
                    </div>
                </div>
                <div className="mb-3 ">
                    <label>Upload a detailed bussiness proposal</label>
                    <textarea
                        value={form.bussinessProposal}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Details"
                    onChange={(e) =>setForm({...form,bussinessProposal:e.target.value})}

                    />
                </div>
                <div className="d-grid" >
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
               
            </form>


        </div>
        </div>
  )
}

export default UserHome