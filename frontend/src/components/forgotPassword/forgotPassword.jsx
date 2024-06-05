import React, { useState } from 'react';
import axios from 'axios';
import './forgotPassword.css';
import ResetPassword from '../../components/forgotPassword/resetPassword';
import bcrypt from "bcryptjs";

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [isSecurityAnswerCorrect, setIsSecurityAnswerCorrect] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.get(`/users/phone/${phone}`);
      const userData = response.data;
      if (userData) {
        setUser(userData);
        setError('');
        setIsSecurityAnswerCorrect(false); 
      } else {
        setUser(null);
        setError('User not found');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      setError('Error fetching user information');
    }
  };

  const handleAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  const handleValidateAnswer = async () => {
    try {
      const response = await axios.get(`/users/phone/${phone}`);
      const userData = response.data;
      if (userData) {
        setUser(userData);
        const isSecurityAnswerCorrect = await bcrypt.compare(securityAnswer, userData.securityAnswer);
  
        if (isSecurityAnswerCorrect) {
          setIsSecurityAnswerCorrect(true);
          setError(''); 
        } else {
          setIsSecurityAnswerCorrect(false);
          setError('Incorrect security answer');
        }
      } else {
        setUser(null);
        setIsSecurityAnswerCorrect(false);
        setError('User not found');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      setError('Error fetching user information');
    }
  };

  const handleResetPassword = async (newPassword) => {
    try {
      const response = await axios.post('/users/reset-password', {
        userId: user._id, 
        newPassword: newPassword,
      });
  
 
      if (response.data.success) {
        
        console.log('Password reset successful!');
        setIsResetSuccess(true);
        setError(''); 
      } else {
        console.error('Password reset failed:', response.data.message);
        setError('Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Error resetting password');
    }
  };

  return (
    <div className="fcontainer">
      <h2> Forgot Password</h2>
      {(!user || !isSecurityAnswerCorrect) && (
        <>
          <label className='flabel'>
            Phone:
            <input className='finput' type="text" value={phone} onChange={handlePhoneChange} />
          </label>
          <button className='fsubmit-button' onClick={handleForgotPassword}>Submit</button>
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
        </>
      )}
      
      {user && !isSecurityAnswerCorrect && (
        <div>
          <h3>Welcome {user.username}</h3> 
          <h3>Security Question:</h3>
          <p>{user.securityQuestion}</p>
          <label>
            Answer:
            <input type="text" value={securityAnswer} onChange={handleAnswerChange} />
          </label>
          <button onClick={handleValidateAnswer}>Validate Answer</button>
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
        </div>
      )}

      {isSecurityAnswerCorrect && !isResetSuccess && (
        <ResetPassword onResetPassword={handleResetPassword} />
      )}
    </div>
      );
    };
    
    export default ForgotPassword;
    