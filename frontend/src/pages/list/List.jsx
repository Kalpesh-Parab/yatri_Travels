import "./list.css"
import Navbar from '../../components/navbar/Navbar.jsx'
import Header from '../../components/header/Header.jsx'
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem.jsx";
import useFetch from "../../hooks/useFetch.js";
import { AuthContext } from "../../context/AuthContext.js";


const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination || "");
  const[dates,setDates] = useState(location.state.dates);
  const[openDate,setOpenDate] = useState(false);
  const[options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { user } = useContext(AuthContext)
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [load, setLoad] = useState(true);

  const handleOptionChange = (name, operation) => {
    setOptions((prev) => {
      let newValue = options[name];
      if(operation === "i") newValue += 1;
      else if(operation === "d") newValue -= 1;

      if(name === "adults") newValue = Math.max(1, newValue);
      else newValue = Math.max(0, newValue);

      return{
        ...prev,
        [name]: newValue,
      };
    });
  };

  useEffect(() => {
    console.log("Fetching destinations...");
    fetchDestinations();
  }, []);
  
  useEffect(() => {
    console.log("Available destinations:", availableDestinations);
  }, [availableDestinations]);
  
  useEffect(() => {
    console.log("Destination state:", destination);
  }, [destination]);
  

  const { data, loading, reFetch } = useFetch(
    `/packages/get/all?destinationName=${destination}&min=${min || 1 }&max=${max || 9999999 }`
  );

  const fetchDestinations = async () => {
    try {
      const response = await fetch(`/packages/get/destinations`);
      const data = await response.json();
      console.log("Fetched destinations:", data);
      setAvailableDestinations(data);
      setLoad(false);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setLoad(false);
    }
  };
  

  const handleClick = () => {
    reFetch();
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };


console.log("destination:", destination);
console.log("date:", dates);
console.log("min:", min);
console.log("max:", max);
console.log(location.state.options)
console.log(data)
console.log(user)
console.log(options)




  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Where are you Planning?</label>
              <select
                value={destination}
                onChange={handleDestinationChange}
                className="destinationDropdown"
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
            <div className="lsItem">
              <label>When Are you Planning?</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(
                        dates[0].startDate,
                        "dd/MM/yyyy")}
                        to ${format(dates[0].endDate,"dd/MM/yyyy")}`}
              </span>
                        
                      {openDate && (
                        <DateRange 
                          onChange={(item) => setDates([item.selection])}
                          minDate={new Date()}
                          ranges={dates}
                        />
                      )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price
                  </span>
                  <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" placeholder="minimum" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price
                  </span>
                  <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" placeholder="maximum"/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOptionChange("adult", "d")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onChange={(e) => handleOptionChange("adult", "i")}
                      className="lsOptionInputo"
                      value={options.adult}
                      readOnly
                    />
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOptionChange("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOptionChange("children", "d")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onChange={(e) => handleOptionChange("children", "i")}
                      className="lsOptionInputo"
                      value={options.children}
                      readOnly
                    />
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOptionChange("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Infant</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOptionChange("infant", "d")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onChange={(e) => handleOptionChange("infant", "i")}
                      className="lsOptionInputo"
                      value={options.infant}
                      readOnly
                    />
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOptionChange("infant", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="sBtn" onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
          {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem
                    key={item._id}
                    item={item}
                    destination={destination}
                    dates={dates}
                    options={options}
                />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List