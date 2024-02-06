import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmmer from "./Shimmmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Body = () => {
  //  local state variable--superpowerful variable
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  console.log(listOfRestaurants);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9234937&lng=77.6096753&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(json);
    setListOfRestaurant(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  const OnlineStatus = useOnlineStatus();

  if (OnlineStatus == false)
    return (
      <h1> looks like you are offline!! pls check your internet connection</h1>
    );
  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length == 0 ? (
    <Shimmmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-xl"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter(
                (restaurants) =>
                  restaurants.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredRestaurant);
            }}
          >
            search
          </button>
        </div>

        <div className="items-center px-2 py-2 m-12 bg-green-100 rounded-xl size border-collapse">
          <label>UserName :</label>
          <input
            className="border-black"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resInfo={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
