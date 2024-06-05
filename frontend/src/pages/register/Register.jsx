import React from "react";
import "./register.css";
import RegisterForm from "../../components/registerForm/RegisterForm";
import backgroundVideo from "./background.mp4";

const Register = () => {
  return (
    <div className="background-container">
      <video autoPlay loop muted playsInline className="video-bg">
        <source src={backgroundVideo} type="video/mp4"/>
        Your browser does not support the vedio tag.
      </video>
      <RegisterForm />
    </div>
  );
};

export default Register;
