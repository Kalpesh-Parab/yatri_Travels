import React, { useState } from "react";
import "./accordion.css";

const Accordion = ({ dayDetails }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!dayDetails || !dayDetails.daytitle || !dayDetails.daydesc) {
    return <div>No day details available</div>;
  }

  return (
    <div className="accordionContainer">
      {dayDetails.daytitle.map((title, index) => (
        <div key={index} className={`accordionItem ${openIndex === index ? "open" : ""}`}>
          <div className="accordionHeader" onClick={() => handleToggle(index)}>
            <h3>Day {index + 1} - {title}</h3>
            <span className={`arrow ${openIndex === index ? "open" : ""}`}>
              {openIndex === index ? "▲" : "▼"}
            </span>
          </div>
          <div className="accordionContent">
            <p>{dayDetails.daydesc[index]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
