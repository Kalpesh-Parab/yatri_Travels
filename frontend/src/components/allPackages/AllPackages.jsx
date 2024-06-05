import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import "./allPackages.css";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const AllPackages = () => {
  const { data, loading } = useFetch("/packages");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    if (data) {
      setShuffledData(shuffleArray([...data]));
    }
  }, [data]);

  useEffect(() => {
    let intervalId;
    if (hoveredItem !== null) {
      const photoCount = shuffledData[hoveredItem]?.photos.length || 1;
      intervalId = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % photoCount);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [hoveredItem, shuffledData]);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    setImageIndex(0); // Reset image index when a new item is hovered
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setImageIndex(0); // Reset image index when no item is hovered
  };

  return (
    <div className="f">
      {loading ? (
        "Loading"
      ) : (
        <>
          {shuffledData.map((item, index) => (
            <Link
              to={`/packages/${item._id}`}
              style={{ color: "inherit", textDecoration: "none" }}
              key={item._id}
            >
              <div
                className="fItem"
                key={item._id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={
                    index === hoveredItem
                      ? item.photos[imageIndex]
                      : item.photos[0] || item.photos[0] // Fallback to the first photo if the third photo doesn't exist
                  }
                  alt=""
                  className="fImg"
                />
                <span className="fName">{item.title}</span>
                <span className="fCity">{item.duration}</span>
                <span className="fPrice">
                  <p>PRICE</p> Rs.{item.price}
                </span>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default AllPackages;
