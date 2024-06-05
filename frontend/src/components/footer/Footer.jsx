
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebook, faInstagram, faWhatsapp, faGoogle } from "@fortawesome/free-brands-svg-icons";
import ReviewsContainer from "../reviewContainer/ReviewContainer";
import IgPhotos from "../igphotos/Igphotos";


const Footer = () => {

  const posts = [
    { img: "https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/instagram/t/C1G0vKWv_kw", link: "https://www.instagram.com/p/C1G0vKWv_kw/?utm_source=ig_web_copy_link" },
    { img: "https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/instagram/t/ClGGyyjtGKT", link: "https://www.instagram.com/p/ClGGyyjtGKT/?utm_source=ig_web_copy_link" },
    { img: "https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/instagram/t/CobY9-yvuf7",  link: "https://www.instagram.com/p/CobY9-yvuf7/?utm_source=ig_web_copy_link" },
    { img: "https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/instagram/t/CqOzL8vvNyn",  link: "https://www.instagram.com/p/CqOzL8vvNyn/?utm_source=ig_web_copy_link" },
    { img: "https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/instagram/t/CtQrdnGI4wa",  link: "https://www.instagram.com/p/CtQrdnGI4wa/?utm_source=ig_web_copy_link" },
    { img: "https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/instagram/t/CuGroeyovKS",  link: "https://www.instagram.com/p/CuGroeyovKS/?utm_source=ig_web_copy_link" }
  ];

  return (
    <div className="footer">
      <div className="top">
        <div className="left">
        <div className="fLists">
          <div className="ftitle">Yatri Tourism Pune</div>
          <div className="columns">
            <div className="fColumn">
              <p>Group Tour</p>
              <p>Honeymoon Tour</p>
              <p>Customized Tour</p>
              <p>Domestic Tour</p>
            </div>
            <div className="fColumn">
              <p>International Tour</p>
              <p>School Tour</p>
              <p>Corporate Tour</p>
              <p>MICE Tour</p>
            </div>
            <div className="fColumn">
              <p>Hotels</p>
              <p>Bus</p>
              <p>Flight</p>
              <p>Cruise</p>
            </div>
            <div className="fColumn">
              <p>Railway</p>
              <p>Passport</p>
              <p>Visa</p>
              <p>Forex</p>
            </div>
          </div>

          <p>Contact : +91 8793082326 / 9175334792</p>
          
            <div className="sociallinks">
            <a href="https://www.facebook.com/people/Yatri-Tourism-Pune/100089987626403/?mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.instagram.com/yatri_tourism_/?igsh=OGQ5ZDc2ODk2ZA%3D%3D" class="instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://api.whatsapp.com/send?phone=918793082326&text=Greetings%20From%20Yatri%20Tourism%20Pune..."><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="https://yatritourismpune.com/"><FontAwesomeIcon icon={faGoogle} /></a>
          </div>
              
          <div className="quickLinks">
            <a href="/">Home |</a>
            <a href="/viewAll">Packages |</a>
            <a href="/about">About Us</a>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="reviewCont">
          <ReviewsContainer />
        </div>        
        <IgPhotos type="footerIg" photos={posts.map(post => post.img)} igposts={posts.map(post => post.link)} />
      </div>
      </div>
      <div className="fText">
        <p>Copyright @ 2024 YatriTourism.</p>
      </div>
    </div>
  );
};

export default Footer;
