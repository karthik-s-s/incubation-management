
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
function AdminLogin() {



    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => {
        const admintoken = localStorage.getItem("admintoken");
        if(admintoken) {
            const decodedAdmin =  jwt.decode(admintoken);
            if(!decodedAdmin){
                localStorage.removeItem("admintoken");
                navigate("/adminlogin", { replace: true }); 
            }else{
              navigate('admin')
            }
        }else{
          navigate("/adminlogin", { replace: true }); 

        }
     
    }, [])
    



    async function loginAdmin(event) {
        event.preventDefault();
        const responce = await fetch("http://localhost:9000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await responce.json();
        
        if(data.admin){
            localStorage.setItem('admintoken',data.admin) // token name and token data
            const admin = jwt.decode(data.admin);
            console.log(admin.userId); //user email userId
            alert("Login success")
            navigate('/admin')
        }else{
            alert("Login Failed")
        }
      }
  return (
    <div>
       <div class="rcontainer">
        <div class="screen">
          <div class="screen__content">
            <form onSubmit={loginAdmin} >
            
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  class="login__input"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />{" "}
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input
                  class="login__input"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />{" "}
              </div>
              <button type="submit" class="button login__submit">
                <span class="button__text">Log in</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
              {/* <button onClick={()=>navigate('/register')} class="btn btn-outline-primary mt-4">signup</button> */}

            </form>
           
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
   







    </div>

  )
}

export default AdminLogin