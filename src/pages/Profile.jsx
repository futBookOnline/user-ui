import React, { useEffect, useState } from "react";
import { useRelatedApi } from "../helpers/api.helper";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const fetctUser = async () => {
    const response = await useRelatedApi(
      `users/${localStorage.getItem("userId")}`,
      "get",
      ""
    );
    setUserData(response.data);
  };
  useEffect(() => {
    fetctUser();
  }, []);

  const updateProfile = async () => {
    console.log("USER PROFILE: ", userData);
    const response = await useRelatedApi(
      `users/${userData._id}`,
      "put",
      userData
    );
    console.log("RESPONSE: ", response);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <Layout>
      <div className="text-center">
        <img src={userData && userData.imageUrl} height={200} width={200} />
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingFullname"
              value={userData?.fullName || ""}
              placeholder="Fullname"
              onChange={(event) =>
                setUserData((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
            />
            <label htmlFor="floatingFullname">Fullname</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              value={userData?.email || ""}
              placeholder="email"
              disabled
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingContact"
              value={userData?.contact || ""}
              placeholder="contact"
              onChange={(event) =>
                setUserData((prev) => ({
                  ...prev,
                  contact: event.target.value,
                }))
              }
            />
            <label htmlFor="floatingContact">Contact</label>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingDateOfBirth"
                  value={
                    userData?.dateOfBirth
                      ? new Date(userData.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  placeholder="Date of Birth"
                  onChange={(event) =>
                    setUserData((prev) => ({
                      ...prev,
                      dateOfBirth: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingDateOfBirth">Date of Birth</label>
              </div>
            </div>
            <div className="col d-flex flex-column">
              <label>Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="maleCheckbox"
                    name="genderRadios"
                    value="male"
                    checked={userData?.gender === "male"}
                    onChange={(event) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: event.target.value,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="maleCheckbox">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="femaleCheckbox"
                    name="genderRadios"
                    value="female"
                    checked={userData?.gender === "female"}
                    onChange={(event) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: event.target.value,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="femaleCheckbox">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary form-control mb-3"
            onClick={updateProfile}
          >
            Update Profile
          </button>
          <Link
            className="btn btn-secondary form-control"
            onClick={() => setShow(true)}
          >
            Change Password
          </Link>
        </div>
      </div>
      {/* CHANGE PASSWORD MODAL */}
      {show && <ChangePasswordModal close={handleClose} />}
    </Layout>
  );
};

export default Profile;
