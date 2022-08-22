
import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

function UserLogin() {

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  useEffect(() => {
    const usertoken = localStorage.getItem("usertoken");
    console.log(usertoken);
    console.log("usertokennnn");
    if (usertoken) {
      const decodedUser = jwt.decode(usertoken);
      if (!decodedUser) {
        localStorage.removeItem("usertoken");
        navigate("/", { replace: true });
      } else {
        navigate("/userhome");
      }
    }else{
      navigate("/");
    }
  
}, [])


  

  async function loginUser(event) {
   

    event.preventDefault();
    const responce = await fetch("http://localhost:9000/login", {
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
    if(data.user){
        localStorage.setItem('usertoken',data.user) // token name and token data
        const user = jwt.decode(data.user);
        console.log(user.userId); //user email userId
        alert("Login success")
        navigate('/userhome')
    }else{
        alert("Login Failed")
    }
  }
  return (
    <div>
       <div class="rcontainer">
        <div class="screen">
          <div class="screen__content">
            <form onSubmit={loginUser} >
            
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
                <span class="button__text">log in</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
              <button onClick={()=>navigate('/register')} class="btn btn-outline-primary mt-4">signup</button>

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
  );
}

export default UserLogin;
