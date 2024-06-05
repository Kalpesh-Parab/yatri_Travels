import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SettingsPhoneOutlinedIcon from '@mui/icons-material/SettingsPhoneOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {

    const {dispatch} = useContext(DarkModeContext);
    const {user} = useContext(AuthContext);
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogOut = () => {
        localStorage.clear();

        document.cookie.split(";").forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        })

        window.location.reload();
        navigate("/login");
    }

  return (
    <div className = "sidebar">
        <div className="top">
            <Link to="/users/profile" style={{"textDecoration": "none"}}>
               {user && <span className="logo">
                    {user.username}
                    </span>}
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/" style={{"textDecoration": "none"}}>
                <li className={`headerListItem ${location.pathname === '/' ? 'active' : ''}`}>
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to="/users" style={{"textDecoration": "none"}}>
                <li className={`headerListItem ${location.pathname === '/users' ? 'active' : ''}`}>
                    <GroupIcon className="icon"/>
                    <span>Users</span>
                </li>
                </Link>
                <Link to="/packages" style={{"textDecoration": "none"}}>
                <li className={`headerListItem ${location.pathname === '/packages' ? 'active' : ''}`}>
                    <LocalAirportOutlinedIcon className="icon"/>
                    <span>Packages</span>
                </li>
                </Link>
                <li className={`headerListItem ${location.pathname === '/enquiry' ? 'active' : ''}`}
                    onClick={() => {navigate("/enquiry")}}>
                    <EmailIcon className="icon"/>
                    <span>Enquiries</span>
                </li>
                <p className="title">UPDATES</p>
                <li className={`headerListItem ${location.pathname === '/notifications' ? 'active' : ''}`}
                    onClick={() => {navigate("/notifications")}}>
                    <PendingActionsOutlinedIcon className="icon"/>
                    <span>Pending</span>
                </li>
                <li className={`headerListItem ${location.pathname === '/checked' ? 'active' : ''}`}
                    onClick={() => {navigate("/checked")}}>
                    <CheckCircleOutlineOutlinedIcon className="icon"/>
                    <span>Checked</span>
                </li>
                <li className={`headerListItem ${location.pathname === '/contacted' ? 'active' : ''}`}
                    onClick={() => {navigate("/contacted")}}>
                    <SettingsPhoneOutlinedIcon className="icon"/>
                    <span>Contacted</span>
                </li>
                <p className="title">USER</p>
                <li className={`headerListItem ${location.pathname === '/users/profile' ? 'active' : ''}`}
                    onClick={() => {navigate("/users/profile")}}>
                    <AccountCircleIcon className="icon"/>
                    <span>Profile</span>
                </li>
                <li className={`headerListItem ${location.pathname === '/assignedTo' ? 'active' : ''}`}
                    onClick={() => {navigate("/assignedTo")}}>
                    <AssignmentOutlinedIcon className="icon" />
                    <span>Assigned Enquiries</span>
                </li>
                <li onClick={handleLogOut}>
                    <LogoutIcon className="icon"/>
                    <span>LogOut</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div 
                className="colorOptions" 
                onClick={() => dispatch({type:"LIGHT"})}></div>
            <div 
                className="colorOptions" 
                onClick={() => dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar;