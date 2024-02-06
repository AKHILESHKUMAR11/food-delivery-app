import React, { lazy, Suspense } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./componentsfold/header";
import Body from "./componentsfold/body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./componentsfold/About";
import Contact from "./componentsfold/Contact";
import Error from "./componentsfold/Error";
import RestaurantMenu from "./componentsfold/RestaurantMenu";
import { useState, useEffect } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./componentsfold/Cart";
//import Grocery from "./componentsfold/Grocery";

//chunking

//code splitting
//dynamic bundling
//lAZY LOADING
//ON DEMAND LOADING

const Grocery = lazy(() => import("./componentsfold/Grocery"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const data = {
      name: "Akhilesh kumar",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />

          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1> loading.....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
