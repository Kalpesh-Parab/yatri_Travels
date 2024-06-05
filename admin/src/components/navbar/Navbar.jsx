import "./navbar.scss";

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const [pending, setPending] = useState(0);
  const [checked, setChecked] = useState(0);
  const {dispatch, darkMode} = useContext(DarkModeContext);
  const [modeIcon, setModeIcon] = useState(darkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try{
        const {data : pendingResponse} = await axios.get("/enquiry/count/Pending");
        const {data : checkedResponse} = await axios.get("/enquiry/count/Checked");
        setPending(pendingResponse.count);
        setChecked(checkedResponse.count);
      } catch(error) {
        console.error("Error fetching pending count: ", error);
      }
    };
    fetchCounts();
  },[]);

  const handleMode = () =>{
    setModeIcon(darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />)
    dispatch({type: "TOGGLE"});
  };

  const toggleFullscreen = () => {
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
        if(document.exitFullscreen){
          document.exitFullscreen();
          setIsFullScreen(false);
      }
    }
  };

  return (
    <div className = "navbar">
        <div className="wrapper">
          <div className="items">
            <div className="item">
              <div className="icon" onClick={handleMode}>
                {modeIcon}
              </div>
            </div>
            <div className="item" onClick={toggleFullscreen}>
              {isFullScreen ? <FullscreenExitOutlinedIcon className="icon"/> : <FullscreenOutlinedIcon className="icon"/> }              
            </div>
            <div className="item">
              <NotificationsNoneOutlinedIcon className="icon" onClick={() => {navigate("/notifications")}}/>
              <div className="counter">{pending}</div>              
            </div>
            <div className="item">
              <PhoneOutlinedIcon className="icon" onClick={() => {navigate("/checked")}}/>
              <div className="counter">{checked}</div>              
            </div>
           
          </div>
        </div>
    </div>
  )
}

export default Navbar;