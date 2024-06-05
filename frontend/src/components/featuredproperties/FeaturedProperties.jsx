import "./featuredproperties.css";
import useFetch from "../../hooks/useFetch.js";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/packages/get/main?mainPackage=true");
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <Link to={`/packages/${item._id}`} key={item._id} style={{ color: "inherit", textDecoration: "none" }}>

            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="rj-img" className="fpImg" />
              <span className="fpName">{item.title}</span>
              <span className="fpDays">{item.duration}</span>
              <span className="fpPrice">Rs. {item.price}</span>
            </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;