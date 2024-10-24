import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Futsal from "../pages/Futsal";
import NearbyFutsal from "../pages/NearbyFutsal";
import AllFutsal from "../pages/AllFutsal";
import Event from "../pages/Event";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import Booking from "../pages/Booking";
import Register from "../pages/Register";
import ConfirmRegistration from "../pages/ConfirmRegistration";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/futsal/:id" element={<Futsal />} />
      <Route path="/nearby-futsals/" element={<NearbyFutsal />} />
      <Route path="/all-futsals/" element={<AllFutsal />} />
      <Route path="/events/" element={<Event />} />
      <Route path="/shop/" element={<Shop />} />
      <Route path="/contact/" element={<Contact />} />
      <Route path="/register/" element={<Register />} />
      <Route
        path="/me"
        element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        }
      />
      <Route
        path="/booking"
        element={
          <PrivateRouter>
            <Booking />
          </PrivateRouter>
        }
      />
      <Route
        path="confirm-registration"
        element={
          <PrivateRouter>
            <ConfirmRegistration />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};

export default PublicRouter;
