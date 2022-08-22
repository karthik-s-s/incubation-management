import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import UserHomePage from "./pages/UserHomePage";
import UserContext from "./context/UserContext";
import RegisterPage from "./pages/RegisterPage";
import UserLoginPage from "./pages/UserLoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminRecordPage from "./pages/AdminRecordPage";
import BookingPage from "./pages/BookingPage";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {
  return (
    <div className="App">
      <UserContext>
      <Routes>
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/recordlist" element={<AdminRecordPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path ='/adminlogin' element={<AdminLoginPage/>}/>

        

      </Routes>
      </UserContext>
    </div>
  );
}

export default App;
