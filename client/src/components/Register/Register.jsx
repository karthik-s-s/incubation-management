import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const responce = await fetch("http://localhost:9000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await responce.json();
    if (data.status === "ok") {
      navigate("/");
    } else {
      alert("User Already Exist");
      navigate("/register");
    }
  }
  return (
    <div>
      <div class="rcontainer">
        <div class="screen">
          <div class="screen__content">
            <form onSubmit={registerUser} >
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  class="login__input"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Name"
                  required
                />{" "}
              </div>
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
                <span class="button__text">Register</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
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

export default Register;
