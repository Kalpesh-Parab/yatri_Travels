import React, { useState } from "react";
import "./information.css";

const Information = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  return (
    <div className="information">
      <div
        className={`informationItem ${hoveredItem === 0 ? "hovered" : ""}`}
        onMouseEnter={() => handleItemHover(0)}
        onMouseLeave={() => handleItemHover(null)}
      >
        <img
          src="https://img.freepik.com/premium-vector/travel-around-world-online-journey-couple-is-planning-their-trip-choosing-best-route-travel-agency-tour-abroad-color-vector-illustration-flat-style_776652-2239.jpg"
          alt="cj-img"
          className="informationImg"
        />
        <div className="informationTitles">
          <h1>Comfortable Journey</h1>
          <p>
            Experience the epitome of relaxation and convenience with our
            seamless and comfortable journeys tailored just for you.
          </p>
        </div>
      </div>
      <div
        className={`informationItem ${hoveredItem === 1 ? "hovered" : ""}`}
        onMouseEnter={() => handleItemHover(1)}
        onMouseLeave={() => handleItemHover(null)}
      >
        <img
          src="https://img.freepik.com/free-vector/lifestyle-hotel-illustration_335657-398.jpg"
          alt="lh-img"
          className="informationImg"
        />
        <div className="informationTitles">
          <h1>Luxurious Hotel</h1>
          <p>
            Indulge in opulent comfort and unmatched elegance at our handpicked
            selection of luxurious hotels, where every stay is a journey into
            refined luxury.
          </p>
        </div>
      </div>
      <div
        className={`informationItem ${hoveredItem === 2 ? "hovered" : ""}`}
        onMouseEnter={() => handleItemHover(2)}
        onMouseLeave={() => handleItemHover(null)}
      >
        <img
          src="https://img.freepik.com/free-vector/inside-country-traveling-abstract-concept-illustration_335657-2480.jpg"
          alt="tg-img"
          className="informationImg"
        />
        <div className="informationTitles">
          <h1>Travel Guide</h1>
          <p>
            Embark on a journey of discovery with our comprehensive Travel
            Guide, curated to enhance every step of your adventure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;