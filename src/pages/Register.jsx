import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async () => {
    if (!formData?.fullName) setError("FullName is required");
    else if (!formData?.email) setError("Email is required");
    else if (!formData?.password) setError("Password is required");
    else if (!formData?.confirmPassword)
      setError("Confirm password is required");
    else {
      if (formData.confirmPassword !== formData.password)
        setError("Passwords do not match");
      else {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };
        const response = await useRelatedApi("users", "post", payload);
        console.log("RESPONSE: ", response);
        if (!response.success){
            return setError(response.error.email || response.error.password);
        }
        localStorage.setItem("userId", response.data._id)
        navigate("/confirm-registration")
      }
    }
    console.log("FORM DATA: ", formData);
  };
  return (
    <Layout>
      <section className="bg-image">
        <div className="mask d-flex align-items-center gradient-custom-3">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-3">
                      Create an account
                    </h2>
                    {error && (
                      <p className="text-danger text-center mb-3">{error}</p>
                    )}
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control"
                        onChange={(event) => {
                          setError(null);
                          setFormData((prev) => ({
                            ...prev,
                            fullName: event.target.value,
                          }));
                        }}
                      />
                    </div>

                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control"
                        onChange={(event) => {
                          setError(null);
                          setFormData((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }));
                        }}
                      />
                    </div>

                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control"
                        onChange={(event) => {
                          setError(null);
                          setFormData((prev) => ({
                            ...prev,
                            password: event.target.value,
                          }));
                        }}
                      />
                    </div>

                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control"
                        onChange={(event) => {
                          setError(null);
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: event.target.value,
                          }));
                        }}
                      />
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        checked
                        disabled
                        id="form2Example3cg"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3g"
                      >
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success form-control"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
