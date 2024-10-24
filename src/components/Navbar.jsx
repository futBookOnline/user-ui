import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";

const Navbar = ({ showModal, isLogged, logout }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const fetchLoggeduser = async () => {
    const response =
      isLogged &&
      (await useRelatedApi(
        `users/${localStorage.getItem("userId")}`,
        "get",
        ""
      ));
    if (response) setLoggedUser(response.data);
  };
  useEffect(() => {
    fetchLoggeduser();
  }, [isLogged]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nearby-futsals">
                Nearby Futsals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all-futsals">
                All Futsals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop" target="_blank">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {isLogged && loggedUser && <li className="nav-item">
              <Link className="nav-link" to="/booking">
                My Bookings
              </Link>
            </li>}
          </ul>
          {isLogged && loggedUser ? (
            <>
            
              <Link className="nav-link me-4" to={"/me"}>
                <img
                  src={`${loggedUser.imageUrl}`}
                  height={40}
                  width={40}
                  alt="profile-pic"
                />{" "}
                {loggedUser.fullName}
              </Link>
              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
            <button className="btn btn-primary btn-sm me-2" onClick={showModal}>
              Login
            </button>
            <Link className="btn btn-primary btn-sm" to={"/register"}>
            Register
          </Link>
          </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
