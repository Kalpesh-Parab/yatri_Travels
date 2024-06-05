import "./particular.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import IgPhotos from "../../components/igphotos/Igphotos.jsx"
import Footer from "../../components/footer/Footer"
import MailList from "../../components/mailList/MailList"
import Enquire from "../../components/enquire/Enquire.jsx"
import { useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot, faTrain, faUtensils } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch.js";
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext.js"
import Accordion from "../../components/accordion/Accordion.jsx"

const Particular = () => {
  const location = useLocation();
  const [dates, setDates] = useState(location.state?.dates || []);
  const [options, setOptions] = useState(location.state?.options || []);
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading } = useFetch(`/packages/${id}`);  
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    if( date1 && date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    } else {
      return 0;
    }
  }
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  const photoCount = data?.photos?.length || 0;

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photoCount - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photoCount - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login", { 
        state: { 
          redirectedFrom: location.pathname,
          dates: dates,
          options: options
        }
      });
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        handleMove("l");
      } else if (e.key === "ArrowRight") {
        handleMove("r");
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [handleMove]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    let intervalId;
    if (window.innerWidth <= 480 && data.photos) {
      intervalId = setInterval(() => {
        setSlideNumber(prevSlideNumber => 
          prevSlideNumber === data.photos.length - 1 ? 0 : prevSlideNumber + 1
        );
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [data.photos]);

  useEffect(() => {
    const packageImages = document.querySelector(".packageImages");
    const imageWrappers = packageImages.querySelectorAll(".pImgWrapper");
    
    if (window.innerWidth <= 480) {
      imageWrappers.forEach((wrapper, index) => {
        wrapper.style.display = index === slideNumber ? "block" : "none";
      });
    }
  }, [slideNumber, data.photos]);

  console.log(user);
  console.log(data);
  console.log(days);
  console.log(openModal);
  console.log(location.state?.options ?? "No options selected");
  console.log(location.state?.dates ?? "No dates selected");
  console.log(dates);
  console.log(options);
  console.log(setDates);
  console.log(setOptions);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading Please Wait"
      ) : (
        <div className="packageContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="packageWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            <h1 className="packageTitle">{data.title}</h1>
            <div className="packageAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.destinationName}</span>
            </div>
            <span className="packageDuration">Duration: {data.duration}</span>
            <span className="packagePriceHighlight">
              Price : INR {data.price} Onwards
            </span>
            <div className="packageAddress">
              <FontAwesomeIcon icon={faTrain} className="iconColor" />
              <span>Transport</span> |
              <FontAwesomeIcon icon={faBed} className="iconColor" />
              <span>Accommodation</span> |
              <FontAwesomeIcon icon={faUtensils} className="iconColor" />
              <span>Meals</span>
            </div>
            <div className="packageImages">
              {data.photos?.map((photo, i) => (
                <div className="pImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="pImg" />
                </div>
              ))}
            </div>
            <h3 className="daysDestInfo">Yatri Tourism Pune proudly presents an exclusive {data.duration} {data.destinationName} Trip!</h3>
            <Accordion dayDetails={data} />
            <div className="packageDetails">
              <div className="packageDetailsText">
                <h1 className="packageTitle">{data.titleDesc}</h1>
                <p className="pDetails">
                  {data.packagedesc}
                </p>
              </div>
              <div className="packageDetailsPrice">
                <h1>{data.catchphrase}</h1>
                <span>
                  Embark on a journey beyond boundaries with <b>Yatri Tourism!</b>
                </span>
                <h2>
                  <p>₹{data.price}</p> <b>({days === 0 ? data.duration : `(${days} Days) Prices may change as per customised days`})</b>
                </h2>
                <button onClick={handleClick}>Book Your Package Now!</button>
              </div>
            </div>
          </div>
          <IgPhotos photos={data.igphotos} igposts={data.igpost} />
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <div>
          <div className="enquiryBackdrop" onClick={() => setOpenModal(false)} />
          <Enquire
            user={user}
            data={data}
            days={days}
            options={location.state?.options ?? "No options selected"}
            dates={location.state?.dates ?? "No dates selected"}
            setOpen={setOpenModal}
          />
        </div>
      )}
    </div>
  )
}

export default Particular
