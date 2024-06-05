import React from 'react';
import './about.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';

const AboutUs = () => {
    return (
        <div id='parent'>
        <Navbar/>
        <Header type="list" />
        <div className="about-us-container">
            <div className="about-us-content">
                <h1>About Us</h1>
                <section className="intro">
                    <p>Welcome to Yatri Tourism Pune!</p>
                    <p>Yatri Tourism Pune was founded in September 2022 by three wanderers: the late Deepak Shelke, Chaitanya Bhalerao, and Satyam Pardeshi. We're your gateway to unforgettable travel experiences in India.</p>
                </section>
                <section className="who-we-are">
                    <h2>
                      Our Vision
                    </h2>
                    <p>
                      Inspired by Deepak Shelke's passion for exploration, we're committed to delivering exceptional service and authentic cultural experiences.
                    </p>
                </section>
                <section className="mission">
                    <h2>What We Offer</h2>
                    <p>From accommodations to transportation, ticketing, and beyond, we provide comprehensive travel solutions tailored to your needs and preferences.</p>
                </section>
                <section className="what-we-offer">
                    <h2>Our services include</h2>
                    <ul>
                        <li><strong>Accommodations:</strong> Discover a wide range of lodging options, from boutique hotels to heritage properties, ensuring comfort and authenticity.</li>
                        <li><strong>Transportation:</strong> Enjoy hassle-free travel with our selection of transportation options, including private cars, trains, buses, and more.</li>
                        <li><strong>Ticketing: </strong> Whether you're looking for domestic flights, train tickets, or entry passes to local attractions, we've got you covered.</li>
                        <li><strong>Tour Packages:</strong> Explore India's diverse landscapes and cultures with our curated tour packages, featuring expert guides and immersive experiences.</li>
                        <li><strong>Travel Insurance: </strong> Stay protected on your journey with our comprehensive travel insurance plans, offering peace of mind and security.</li>
                    </ul>
                </section>
                <section className="why-choose-us">
                    <h2>Why Choose Us</h2>
                    <p>Our commitment to providing exceptional service is reflected in the positive feedback and repeat business from our valued clients. Here's why:</p>
                    <ul>
                        <li><strong>Expert Knowledge:</strong> Our team comprises seasoned travel experts who bring years of experience and a wealth of knowledge to every itinerary.</li>
                        <li><strong>Personalized Service:</strong> We take the time to understand your travel needs and preferences, crafting tailor-made experiences that exceed your expectations.</li>
                        <li><strong>Global Network:</strong> With a vast network of trusted partners worldwide, we ensure you receive the best deals, accommodations, and experiences wherever you go.</li>
                        <li><strong>Customer Satisfaction:</strong> Our commitment to providing exceptional service is reflected in the positive feedback and repeat business from our valued clients.</li>
                    </ul>
                </section>
                <section className="meet-the-team">
                    <h2>Meet the Team</h2>
                    <p>Our dedicated team of travel consultants, tour guides, and support staff are here to make your travel dreams a reality. We are passionate about what we do, and our goal is to share that passion with you by delivering memorable travel experiences.</p>
                </section>
                <section className="contact-us">
                    <h2>Join Us on Your Next Adventure</h2>
                    <p>Your Satisfaction Guaranteed.Our experienced team ensures seamless journeys, personalized service, and unforgettable memories for every traveler.</p>
                    <p><strong>Contact Us</strong></p>
                    <p>Email: yatritourismpune@gmail.com<br />
                       Phone: 8793082326, 9175334792<br />
                       Address: 79, DS Office, Sangamwadi, Shivaji Nagar, Pune - 411005. </p>
                    <p><strong>Connect with Us</strong></p>
                    <p>
                        <a href="https://www.facebook.com/people/Yatri-Tourism-Pune/100089987626403/?mibextid=ZbWKwL" >Facebook |</a> 
                        <a href="https://www.instagram.com/yatri_tourism_/?igsh=OGQ5ZDc2ODk2ZA%3D%3D" >Instagram |</a> 
                        <a href="https://yatritourismpune.com/" >Google |</a> 
                        <a href="https://api.whatsapp.com/send?phone=918793082326&text=Greetings%20From%20Yatri%20Tourism%20Pune..." >WhatsApp</a>
                    </p>
                </section>
            </div>            
        </div>
        <MailList/>
      <Footer />        
        </div>
    );
};

export default AboutUs;