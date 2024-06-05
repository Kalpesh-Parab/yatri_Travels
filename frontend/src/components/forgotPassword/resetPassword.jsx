import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ onResetPassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    if (newPassword === '' || confirmPassword === '') {
      alert('Please enter your new password and confirm it.');
    } else if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      onResetPassword(newPassword);
      setResetSuccess(true);
    }
  };

  if (resetSuccess) {
    setTimeout(() => {
      navigate('/login'); 
    }, 2000);
  }

  return (
    <div>
      <h2>Reset Password</h2>
      {resetSuccess ? (
        <p>Password reset successfully!</p>
      ) : (
        <>
          <label>
            Enter New Password:
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </label>
          <label>
            Re-Enter Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
