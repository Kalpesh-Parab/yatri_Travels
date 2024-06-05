import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured"
 import MailList from "../../components/mailList/MailList";
 import Footer from "../../components/footer/Footer";
 import Information from "../../components/information/Information";

import "./home.css"
import FeaturedProperties from "../../components/featuredproperties/FeaturedProperties";


const Home = () => {
  return (
    <div>
        <Navbar />
        <Header />
         <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Packages that our customers love</h1>
         
          <FeaturedProperties/>
         <h1 className="homeTitle">Why Choose Us?</h1>
          <Information/>
           <MailList/>
          <Footer/>
        </div>  
    </div>
  )
}

export default Home