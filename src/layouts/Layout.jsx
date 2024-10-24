import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import LoginModal from "../components/modals/LoginModal";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState(userId ? true : false);
  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar
          showModal={handleShow}
          isLogged={isLoggedIn}
          logout={handleLogout}
        />
      </div>
      {show && (
        <LoginModal
          modalClose={handleClose}
          loginSuccess={handleLoginSuccess}
        />
      )}
      <div className="row p-3">{children}</div>
      <div className="row position-fixed bottom-0 w-100 p-2 bg-body-tertiary">
        <div className="d-flex justify-content-between">
          <span className="text-center">&copy;&nbsp;Copyright - 2024</span>
          <span>Futsal Finder</span>
          <div>
            <Link className="text-decoration-none">Privacy</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link className="text-decoration-none">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
