import React, { useState, useEffect } from "react";
import "./featured.css";
import useFetch from "../../hooks/useFetch.js";

const Featured = () => {
  const { data, loading } = useFetch(
    "/packages/get/countByType?packageTypes=Group,Cultural,Ladies Special"
  );

  // State to manage the currently flipped card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Function to update the current card index
  const flipCards = () => {
    console.log("Flipping cards"); // Add this line
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  // Effect to automatically flip cards after 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      flipCards();
    }, 3000);

    return () => clearInterval(interval);
  }, []); // Make sure to pass an empty dependency array to run this effect only once on mount
console.log(currentCardIndex);
  return (
    <div className="featured-container">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <div className="flip-card">
              <div className="flip-card-front">
                <div className="inner">
                  <h3>Special Female Trips</h3>
                  <p>Journeys for extraordinary women</p>
                  <h2>{data[0]} packages</h2>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="inner">
                  <h3>Special Female Trips</h3>
                  <p>
                    Embark on unforgettable adventures tailored exclusively for
                    women, fostering connection, empowerment, and enrichment
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-front">
              <div className="inner">
                <h3>Group Tour</h3>
                <p>Discover, bond, explore.</p>
                <h2>{data[1]} packages</h2>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="inner">
                <h3>Group Tour</h3>
                <p>
                  Join our curated group tours for an immersive experience,
                  where shared moments create lasting memories and friendships
                </p>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-front">
              <div className="inner">
                <h3>Customised Trips</h3>
                <p>Crafting your dream getaway</p>
                <h2>{data[2]} packages</h2>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="inner">
                <h3>Customised Trips</h3>
                <p>
                  Tailor your travel experience to perfection with our
                  personalized itineraries, ensuring every moment reflects your
                  unique preferences and desires
                </p>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Featured;
