import "./widget.scss";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { Link } from "react-router-dom";

const Widget = ({ type, count }) => {
    let data;

    switch (type){
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "/users",
                text:"See all users",
                icon: (<PersonOutlineOutlinedIcon className="icon" style={{color: "crimson",backgroundColor:"rgba(255,0,0,0.2)",}} />),
            };
            break;
        case "package":
            data = {
                title: "PACKAGES",
                isMoney: false,
                link: "/packages",
                text:"See all packages",
                icon: (<ShoppingCartOutlinedIcon className="icon" style={{color: "goldenrod",backgroundColor:"rgba(218,165,32,0.2)",}} />),
            };
            break;
        case "enquiry":
            data = {
                title: "ENQUIRIES",
                isMoney: false,
                link: "/enquiry",
                text:"See all enquiries",
                icon: <QuestionAnswerOutlinedIcon className="icon" style={{color: "green",backgroundColor:"rgba(0,128,0,0.2)",}} />,
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "₹"} {count}
                </span>
                <Link to={data.link} className="link" style={{ textDecoration: 'none', color: "inherit"}}>{data.text}</Link>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
