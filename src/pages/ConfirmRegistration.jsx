import React, { useEffect, useState } from "react";
import { useRelatedApi } from "../helpers/api.helper";
const id = localStorage.getItem("userId");
console.log("USER ID: ", id);
const ConfirmRegistration = () => {
  const [userData, setUserData] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const fetchUser = async () => {
    const response = id && (await useRelatedApi(`users/${id}`, "get", ""));
    if (response.success) {
      console.log("RESPONSE: ", response);
      return setUserData(response.data);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchVerificationCode = async () => {
    const response = userData && (
      await useRelatedApi("users/registration-mail", "post", {
        fullName: userData.fullName,
        email: userData.email,
      })
    );
    console.log("VER: ", response);
    if (response && response.success) {
      console.log("VERIFICATION CODE: ", response.data);
      setVerificationCode(response.data);
    }
  };
  useEffect(() => {
    fetchVerificationCode();
  }, [userData]);

  const [seconds, setSeconds] = useState(10); // Initialize timer with 60 seconds
  const [isActive, setIsActive] = useState(true); // To control the timer
  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setIsActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    return () => clearInterval;
  }, []);
  const resendVerification = () => {
    setSeconds(10)
    setIsActive(true)
    fetchVerificationCode()
  }
  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 d-flex flex-column  justify-content-center gap-5 vh-100 ">
          <div>
            <p>Hi, {userData?.fullName}</p>
            <p>
              Verification code has been sent to{" "}
              <span className="fw-bold text-decoration-underline">
                {userData?.email}
              </span>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="confirmationInput">Verification Code</label>
            <input id="confirmationInput" className="form-control" />
          </div>
          <div>
            <p className="text-center">
              Didn't receive verification code ? Try again after {seconds}{" "}
              seconds.{" "}
              {!isActive && (
                <span className="btn btn-sm btn-primary" onClick={resendVerification}>RESEND</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
