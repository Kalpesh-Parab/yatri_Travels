import "./searchItem.css"
import { Link } from "react-router-dom"

const SearchItem = ({ item, destination, dates, options }) => {
  return (
    <div className="searchItem">
        <img src={item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
            <h1 className="siTitle">{item.title}</h1>
            <span className="siDistance">Package Type : <p>{item.packageType}</p></span>
            <span className="siSubtitle">{item.titleDesc}</span>
            <span className="siFeatures">
                {item.catchphrase}
            </span>
            <span className="siCancelOp">Free Cancellation</span>
        </div>
        <div className="siDetails">
            <div className="siDetailTexts">
                <span className="siPrice">₹ {item.price}</span>
                <span className="siTaxOp">Includes all Taxes and fees</span>
                <Link to={`/packages/${item._id}`} state={{ item, destination, dates, options }}>
                    <button className="siCheckButton">Enquire Now</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem