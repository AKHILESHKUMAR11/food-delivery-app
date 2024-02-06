import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);
  // subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-pink-100">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4 ">
          <li className="px-4">Online Status {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/About">about us</Link>
          </li>
          <li className="px-4">
            <Link to="/Contact"> Contact us </Link>
          </li>
          <li className="px-4">
            <Link to="/grocery"> Grocery </Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/Cart"> Cart -({cartItems.length} items) </Link>
          </li>
          <button
            className="login"
            onClick={() => {
              btnNameReact == "login"
                ? setBtnNameReact("logout")
                : setBtnNameReact("login");
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold"> {loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
