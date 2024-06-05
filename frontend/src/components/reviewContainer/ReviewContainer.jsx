import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./reviewContainer.css"; 

const ReviewsContainer = () => {
  const reviews = [
    { text: "The tour organized to Ujjain - onkareshwar - Maheshwari by the Yatri Tourism exceeded expectations.", stars: 5 },
    { text: "Had an Fantastic Trip to Uttrakhand Arranged by Yatri Tourism with excellent planning and Arrangements Thank you Satyam for th planning and assistance", stars: 4 },
    { text: "I recently had the pleasure of booking a trip to Kolhapur with Yatri Tourism, and I must say it was an incredible experience ", stars: 5 },
    { text: "Thank you @yatri tourism for organizing our tour for Punjab and srinagar so well and taking care of all the aspects of a fun vacation.", stars: 5 },
    { text: "Had a great experience with all beloved yatri tourism group, adiyogi looks more perfectly with them. special thanks to chaitanya .", stars: 4 },
    { text: "Thanks @yatritourism for arranging such a wonderful kokan, sindhudurg, and kolhapur trip, the best thing is u know all the needs and .", stars: 5 },
    { text: "The accommodations provided by Yatri Tourism were top-notch. Yatri Tourism's tour guides were a true highlight of the trip.", stars: 5 },
    { text: "I recently took a Ganpatipule trip organized by Yatri Tourism, and I cannot express enough how exceptional the experience was.", stars: 4 },
    { text: "I recently had the pleasure of embarking on a Konkan trip organized by Yatri Tourism, a", stars: 5 },
    { text: "It was brilliant experience with yatri. Enjoyed a lot. Thank you yatri tourism", stars: 5 },

    { text: "Best experience With Yatri Tourism Pune.Proper arrangement of hotel food and bus the service was awesome", stars: 5 },
    { text: "Very well planned trip to Shimla Manali organised by Yatri Tourism. Thank u Guys for your support and assistance throughout the trip.", stars: 4 },
    { text: "We had gone to Ujjain and omkareshwar with yatri tourism it was very well managed trip and hotel was excellent traveling was comfortable .", stars: 5 },
    { text: "Thanks Satyam and Yatri Group for organising the amazing Andaman Trip.", stars: 5 },
    { text: "Thankyou@yatritourism for arranging kerla with, rameshwaram trip it was very nice, we are excited to travel again with you .", stars: 5 },
    { text: "Enjoyed Rajasthan Tour With Yatri Tourism Pune", stars: 5 },
    { text: "It was very amazing trip, And experience between yatri tourism and us was very friendly.Thankyou yatri tourism", stars: 5 },
    { text: "Thank you Yatri Tourism For arranging Tirupati Balaji Trip", stars: 4 },
    { text: "Thank you for arranging the wonderful trip for my family.", stars: 4 },
    { text: "A pleasant experience with Rangila Rajasthan Yatri Tourism A Triveni Confluence of Accurate Information Proper Planning and Courtesy.", stars: 5 },

    { text: "A very well planned tour and best of luck on the next trip with you.", stars: 4 },
    { text: "Very well planned trip to Shimla Manali organised by Yatri Tourism.", stars: 5 },
    { text: "Thank you for arranging the wonderful trip for my family.", stars: 4 },

  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  
   
    return () => clearInterval(interval);
  }, [reviews.length]);
  
  

  return (
    <div className="reviews-carousel">
      <h2>Customer Reviews</h2>
      <div className="carousel" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <p>{review.text}</p>
            <div className="stars">
              {Array.from({ length: review.stars }, (_, index) => (
                <FontAwesomeIcon icon={faStar} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="reviewBtnDiv">
        <button className="leaveReviewBtn"> <a
              href="https://www.google.com/search?q=yatri+tourism+pune&rlz=1C1ONGR_enIN1095IN1095&oq=yatri&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIMCAAQRRg5GLEDGIAEMgYIARBFGDsyBggCEEUYOzIHCAMQABiABDITCAQQLhivARjHARiABBiYBRiZBTIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIKCAgQABixAxiABDIHCAkQABiABNIBCTQyNDFqMGoxNagCCLACAQ&sourceid=chrome&ie=UTF-8#lrd=0x3bc2c11ffcc186df:0x308392223db0ed10,1,,,,"
              target="_blank"
              rel="noopener noreferrer"
              style={{textDecoration: "none", color: "inherit"}}
            >  Leave a Review            
            </a></button>
      </div>
    </div>
  );
};

export default ReviewsContainer;