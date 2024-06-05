import {
  faAddressCard,
  faBars,
  faCalendarDays,
  faHouse,
  faLocationDot,
  faUmbrellaBeach,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import { DateRange } from "react-date-range";
import { useState, useContext, useEffect } from "react";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from "date-fns";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate ("/")
  };
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  });
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(AuthContext);
  const location = useLocation();

  const handleSearch = () => {
    navigate("/packages", { state: { destination, dates, options } });
  };


  const fetchDestinations = async () => {
    try {
      const response = await fetch(`/packages/get/destinations`);
      const data = await response.json();
      setAvailableDestinations(data);
      setLoad(false);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
  }, [availableDestinations]);

  useEffect(() => {
  }, [destination]);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);  

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
        <div className="mobileMenuIcon" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
         <div className={`headerListItem ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/" style={{color: "Black", fontWeight: 400, textDecoration:"none"}}>
              <FontAwesomeIcon icon={faHouse} />
              <span> Home</span>
            </Link>
          </div>
          <div className={`headerListItem ${location.pathname === '/viewAll' ? 'active' : ''}`}>
            <Link to="/viewAll" style={{color: "Black", fontWeight: 400, textDecoration:"none"}}>
              <FontAwesomeIcon icon={faUmbrellaBeach} />
              <span> Packages</span>
            </Link>
          </div>
          <div className={`headerListItem ${location.pathname === '/about' ? 'active' : ''}`}>
          <Link to="/about" style={{color: "Black", fontWeight: 400, textDecoration:"none"}}>
            <FontAwesomeIcon icon={faAddressCard} />
            <span>About Us</span>
            </Link>
          </div>
          {openMobileMenu && (
            <div className="mobileMenu">
              <div className={`headerListItemm ${location.pathname === '/'}`}>
            <Link to="/" style={{color: "inherit", fontWeight: 400, textDecoration:"none"}}>
              <div className="mobileBtnLabel">
                <FontAwesomeIcon icon={faHouse} />
                <span> Home</span>
              </div>
            </Link>
          </div>
          <div className={`headerListItemm ${location.pathname === '/viewAll'}`}>
            <Link to="/viewAll" style={{color: "inherit", fontWeight: 400, textDecoration:"none"}}>
              <div className="mobileBtnLabel">
                <FontAwesomeIcon icon={faUmbrellaBeach} />
                <span> Packages</span>
              </div>              
            </Link>
          </div>
          <div className={`headerListItemm ${location.pathname === '/about'}`}>
          <Link to="/about" style={{color: "inherit", fontWeight: 400, textDecoration:"none"}}>
            <div className="mobileBtnLabel">
              <FontAwesomeIcon icon={faAddressCard} />
              <span id="about">About Us</span>
            </div>
            </Link>
          </div>
            </div>
          )}
          {user ? (
          <div className="headItems">
            <div className="username" > Welcome, {user.username} !
            <button className="logoutButton" onClick={handleLogout}><b>Logout</b></button>
          </div>
          </div>
        ) : (
          <>
          <div className="headItems">
            <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="headButton"><b>Register</b></button>
            </Link>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="headButton"><b>Login</b></button>
            </Link>
          </div>
          </>
        )}
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">"Embark on a Journey Beyond Boundaries with Yatri Tourism"</h1>
            <p className="headerDesc">"Where Every Destination Unfolds a Story, and Every Journey is a Thoughtful Adventure"</p>
         
            <div className="headerSearch">
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />

                  <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value) & setOpenDate(false) & setOpenOptions(false)}
                  className="headerSearchInput"
                  >
                  <option value="" disabled>
                  Select Destination
                  </option>
                  {load ? (
                      <option disabled>Loading destinations...</option>
                  ) : (
                      availableDestinations.map((dest) => (
                      <option key={dest} value={dest}>
                          {dest}
                      </option>
                      ))
                  )}
                  </select>
              </div>
              <div id="calendarDateRange" className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" onClick={() => setOpenDate(!openDate) & setOpenOptions(false)}/>  
                <span onClick={() => setOpenDate(!openDate) & setOpenOptions(false)} className="headerSearchText">
                  {`${format(
                  dates[0].startDate,
                  "dd/MM/yyyy")}
                        to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />}
              </div>
              <div id="userOptions" className="headerSearchItem" >
                <FontAwesomeIcon icon={faUserGroup} className="headerIcon" onClick={() => setOpenOptions(!openOptions)& setOpenDate(false)}/>
                <span onClick={() => setOpenOptions(!openOptions)& setOpenDate(false)} className="headerSearchText">
                  {`${options.adult} adult · ${options.children} children · ${options.infant} infant`}</span>
                {openOptions && <div className="options">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}> -
                                </button>
                      <span className="optionCounterNumber">{options.adult}</span>
                      <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}> + </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}> -
                                </button>
                      <span className="optionCounterNumber">{options.children}</span>
                      <button className="optionCounterButton" onClick={() => handleOption("children", "i")}> + </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Infant</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.infant <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("infant", "d")}> -
                                </button>
                      <span className="optionCounterNumber">{options.infant}</span>
                      <button className="optionCounterButton" onClick={() => handleOption("infant", "i")}> + </button>
                    </div>
                  </div>
                </div>}
              </div>
              <div className="headerSearchItem">
                <div className="headerBtn" onClick={handleSearch}>
                  Search
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
