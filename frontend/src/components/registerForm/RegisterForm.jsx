import React, { useState } from "react";
import "./registerForm.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        securityQuestion: "",
        securityAnswer: "",
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!formData.securityQuestion || !formData.securityAnswer) {
      console.error("Please provide both security question and answer.");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer,
        }),
      });

      console.log(response);

      if (response.ok) {
        console.log("User registered successfully!");
        navigate("/login");
      } else {
        
        console.error("User registration failed!");
      }
    } catch (error) {
      toast.error("User registration failed!");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label className="sq">
          <select
          className="securityQ"
            name="securityQuestion"
            placeholder="Security Question"
            value={formData.securityQuestion}
            onChange={handleChange}
            required
          >
             <option value="" disabled>
              Select a security question
            </option>
            <option value="What is your mother's maiden name?">
              What is your mother's maiden name?
            </option>
            <option value="In which city were you born?">
              In which city were you born?
            </option>
          </select>
        </label>
        <label>
          <input
            type="text"
            name="securityAnswer"
            placeholder="Your Answer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
        <div className="regbox">
          <p className="linkToLogin">Already have an account?</p>
          <Link style={{color: "inherit", textDecoration: "none"}} to={"/login"}><button className="log_in">Log In</button> </Link>
        </div>        
      </form>
    </div>
  );
};

export default RegisterForm;
