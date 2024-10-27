import React, { useEffect, useState } from "react";
import { useRelatedApi } from "../helpers/api.helper";
import { useNavigate } from "react-router-dom";
const id = localStorage.getItem("userId");

console.log("USER ID: ", id);
const ConfirmRegistration = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const fetchUser = async () => {
    const response = id && (await useRelatedApi(`users/${id}`, "get", ""));
    if (response.success) {
      return setUserData(response.data);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchVerificationCode = async () => {
    const response =
      userData &&
      (await useRelatedApi("users/registration-mail", "post", {
        fullName: userData.fullName,
        email: userData.email,
      }));
    if (response && response.success) {
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
    setSeconds(10);
    setIsActive(true);
    fetchVerificationCode();
  };

  const activateEmail = async () => {
    const response =
       (await useRelatedApi(`users/${id}/activate-email`, 'put', ''));
      response && response.success ? navigate("/me") : setError(response.error);
  };

  const [error, setError] = useState(null);
  const [formVerificationCode, setFormVerificationCode] = useState(null);
  const handleSubmit = async () => {
    if (!formVerificationCode) return setError("Enter verification code.");
    if (verificationCode && formVerificationCode) {
      return formVerificationCode === verificationCode
        ? activateEmail()
        : setError("Did not matched");
    }
  };

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
          <div>
            {error && <p className="text-danger text-center">{error}</p>}
            <div div className="form-group mb-3">
              <label htmlFor="confirmationInput">Verification Code</label>
              <input
                id="confirmationInput"
                className="form-control"
                onChange={(event) => {
                  setError(null);
                  setFormVerificationCode(() => Number(event.target.value));
                }}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary form-control"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          <div>
            <p className="text-center">
              Didn't receive verification code ? Try again after {seconds}{" "}
              seconds.{" "}
              {!isActive && (
                <span
                  className="text-primary text-decoration-underline"
                  onClick={resendVerification}
                >
                  resend
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
