import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "./logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navGradientLeft"></div>
      <div className="navContainer">
        <Link to="/">
          <img className="logo-img" src={logo} alt="Yatri Tourism Logo" />
        </Link>
        <p className="h-logo">
          {Array.from("Yatri Tourism").map((letter, index) => (
            <span key={index} style={{ animationDelay: ` ${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
          <span className="dot">!</span>
        </p>
        <div className="navItems">
          <FontAwesomeIcon icon={faPhone} />
          <span>8793082326 | 9175334792</span>
          <div className="icon-bar-navbar">
            <a
              href="https://www.facebook.com/people/Yatri-Tourism-Pune/100089987626403/?mibextid=ZbWKwL"
              className="navbarFacebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="iconColorNavbarFacebook" />
            </a>
            <a
              href="https://www.instagram.com/yatri_tourism_/?igsh=OGQ5ZDc2ODk2ZA%3D%3D"
              className="navbarInstagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="iconColorNavbarInstagram" />
            </a>
            <a href="https://yatritourismpune.com/" className="navbarGoogle">
              <FontAwesomeIcon icon={faGoogle} className="iconColorNavbarGoogle" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=918793082326&text=Greetings%20From%20Yatri%20Tourism%20Pune..."
              className="navbarWhatsapp"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="iconColorNavbarWhatsapp" />
            </a>
          </div>
        </div>
      </div>
      <div className="navGradientRight"></div>
    </div>
  );
};

export default Navbar;
