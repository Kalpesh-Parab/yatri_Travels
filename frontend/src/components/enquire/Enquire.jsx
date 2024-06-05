import React, { useState } from "react";
import "./enquire.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const EnquireForm = ({ user, data, days, options, dates, setOpen }) => {
  const formatDate = (date) => (date ? new Date(date).toDateString() : "No date selected");

  const [formData, setFormData] = useState({
    userID: user?._id || "",
    userName: user?.username || "",
    phoneNo: user?.phone || "",
    emailID: user?.email || "",
    query: "",
    packageID: data?._id || "No package type selected",
    destinationName: data?.destinationName || "No destination selected",
    packageType: data?.packageType || "No package type selected",
    price: data?.price || "No price available",
    days: days || "No days selected",
    startDate: formatDate(dates.length > 0 ? dates[0]?.startDate : null), 
    options: options ? JSON.stringify(options) : "No options selected",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localStartDate = formData.startDate === "No date selected" ? null : new Date(formData.startDate);
    const dateValue = localStartDate ? new Date(localStartDate.getTime() - localStartDate.getTimezoneOffset() * 60000).toISOString().split('T')[0] : "No date selected";
  
    const enquiryData = {
      userID: user?._id || "",
      userName: user?.username || "",
      phoneNo: user?.phone || "",
      emailID: user?.email || "",
      query: formData.query || "",
      packageID: data?._id || "No package type selected",
      destinationName: data?.destinationName || "No destination selected",
      packageType: data?.packageType || "No package type selected",
      price: data?.price || "No price available",
      date: dateValue,
      days: formData.days === "No days selected" ? "No days selected" : formData.days,
      options: options ? JSON.stringify(options) : "No options selected",
    };

    try {
      const response = await fetch("/enquiry/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });

      if (response.ok) {
        console.log("Enquiry submitted successfully!");
        setOpen(false); 
      } else {
        console.error("Enquiry submission failed!");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };

  return (
    <div className="enquiryForm">
    <FontAwesomeIcon icon={faTimes} className="closeIcon" onClick={() => setOpen(false)} />
      <div className="formTitle">
        <h2>Enquiry Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            disabled
            className="enquiryInput"
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            disabled
            className="enquiryInput"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="emailID"
            value={formData.emailID}
            onChange={handleChange}
            disabled
            className="enquiryInput"
          />
        </label>
        <label>
          Query
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            required
            className="enquiryInput"
          />
        </label>
        <button className="enquirySubmitBtn" type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
};

export default EnquireForm;
