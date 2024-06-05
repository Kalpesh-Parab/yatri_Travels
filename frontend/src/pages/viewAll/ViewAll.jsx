import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import AllPackages from "../../components/allPackages/AllPackages";
import "./viewall.css"

const ViewAll = () => {
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="viewAllContainer">
                <h1 className="viewTitle">Packages that we have</h1>
                <AllPackages />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default ViewAll;