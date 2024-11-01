import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import DashboardHome from "./DashboardHome";
import Context from "./Context/Context";
import Color from "./Pages/Color";
import Profile from "./Pages/Profile";
// import Accordion from "./Accordion";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import AddSizes from "./Pages/AddSizes";
import ViewSizes from "./Pages/ViewSizes";
import AddCategory from "./Pages/AddCategory";
import ViewCategory from "./Pages/ViewCategory";
import UpdateSizes from "./Pages/UpdateSizes";
import UpdateCategory from "./Pages/UpdateCategory";
import AddPCategory from "./Pages/AddPCategory";
import ViewPCategory from "./Pages/ViewPCategory";
import UpdatePCategory from "./Pages/UpdatePCategory";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import ViewProduct from "./Pages/ViewProduct";
import StoryDetails from "./Pages/StoryDetails";
import ViewStory from "./Pages/ViewStory";
import UpdateStories from "./Pages/UpdateStories";
import Order from "./Pages/Order";
import AddSlider from "./Pages/AddSlider";
import UpdateSlider from "./Pages/UpdateSlider";
import ViewSlider from "./Pages/ViewSlider";
import ForgotPassword from "./Pages/ForgotPassword";
import ViewColor from "./Pages/ViewColor";
import UpdateColor from "./Pages/UpdateColor";
const root = ReactDOM.createRoot(document.getElementById("root"));
const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="/reset-password" element={<ForgotPassword />} />,
    <Route path="/dashboard" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/dashboard/color/add-colors" element={<Color />} />
      <Route path="/dashboard/color/view-colors" element={<ViewColor />} />
      <Route path="/dashboard/color/update-colors" element={<UpdateColor />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/size/add-sizes" element={<AddSizes />} />
      <Route path="/dashboard/size/view-sizes" element={<ViewSizes />} />
      <Route path="/dashboard/sizes/update-size" element={<UpdateSizes />} />,
      <Route
        path="/dashboard/category/add-category"
        element={<AddCategory />}
      />
      ,
      <Route
        path="/dashboard/category/view-category"
        element={<ViewCategory />}
      />
      ,
      <Route
        path="/dashboard/category/update-category/:_id"
        element={<UpdateCategory />}
      />
      ,
      <Route
        path="/dashboard/products/add-category"
        element={<AddPCategory />}
      />
      ,
      <Route
        path="/dashboard/products/view-category"
        element={<ViewPCategory />}
      />
      ,
      <Route
        path="/dashboard/products/update-category"
        element={<UpdatePCategory />}
      />
      ,
      <Route path="/dashboard/products/add-product" element={<AddProduct />} />
      <Route
        path="/dashboard/products/view-product"
        element={<ViewProduct />}
      />
      <Route
        path="/dashboard/products/update-product"
        element={<UpdateProduct />}
      />
      ,
      <Route path="/dashboard/stories/add-story" element={<StoryDetails />} />,
      <Route path="/dashboard/stories/view-story" element={<ViewStory />} />,
      <Route
        path="/dashboard/stories/update-stories"
        element={<UpdateStories />}
      />
      ,
      <Route path="/dashboard/orders" element={<Order />} />,
      <Route path="/dashboard/slider/add-slider" element={<AddSlider />} />,
      <Route path="/dashboard/slider/view-slider" element={<ViewSlider />} />,
      <Route
        path="/dashboard/slider/update-slider"
        element={<UpdateSlider />}
      />
      ,
    </Route>,
  ])
);
root.render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={routes} />
    </Context>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
