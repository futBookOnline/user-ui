import React, { useState } from "react";
import { useRelatedApi } from "../../helpers/api.helper";
import { Link } from "react-router-dom";

const LoginModal = ({ modalClose, loginSuccess }) => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const handleLogin = async () => {
    if (!formData?.email) setError("Email is required");
    else if (!formData?.password) setError("Password is required");
    else {
      const response = await useRelatedApi("auth/login", "post", formData);
      if (response.success) {
        localStorage.setItem("userId", response.data._id);
        loginSuccess();
        modalClose();
      } else if (
        response &&
        response.error.toLowerCase() === "email is not active"
      ) {
        setError(response.error);
        const userIdResponse = await useRelatedApi("users/email", "post", {
          email: formData.email,
        });
        if (userIdResponse.success) {
          localStorage.setItem("userId", userIdResponse.data._id);
          
        }
      } else {
        setError(response.error);
      }
    }
  };
  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4">Login</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={modalClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <p className="text-danger text-center mb-3">
                {error.toLowerCase() === "email is not active" ? (
                  <>
                    {error}
                    {". "}
                    <Link to="/confirm-registration">
                      Click here to activate
                    </Link>
                  </>
                ) : (
                  error
                )}
              </p>
            )}

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInputEmail"
                placeholder="name@example.com"
                onChange={(event) => {
                  setError(null);
                  setFormData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
              <label htmlFor="floatingInputEmail">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingInputPassword"
                placeholder="name@example.com"
                onChange={(event) => {
                  setError(null);
                  setFormData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
              />
              <label htmlFor="floatingInputPassword">Password</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
