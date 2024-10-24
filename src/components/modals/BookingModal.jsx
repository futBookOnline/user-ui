import React, { useState, useEffect } from "react";
import { useRelatedApi } from "../../helpers/api.helper";

const BookingModal = (props) => {
  const { modalClose, bookingInfo, bookingSuccess } = props;
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const fetchUser = async () => {
    const response =
      userId && (await useRelatedApi(`users/${userId}`, "get", ""));
    if (response) setFormData(response.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleBooking = async () => {
    const formDataObject = userId
      ? {
          userId,
          slotId: bookingInfo.slotId,
        }
      : {
          slotId: bookingInfo.slotId,
          guestUser: {
            fullName: formData.fullName,
            email: formData.email,
            contact: formData.contact,
          },
        };
    const response = await useRelatedApi("reservations", "post", formDataObject)
    if(response.success){
      bookingSuccess()
    }
    else{
      setError(response.error)
    }
  };
  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">Booking Summary</h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={modalClose}
            ></button>
          </div>
          <div className="modal-body">
          <p className="text-danger text-center mb-3">{error}</p>
            <div className="row">
              <div className="col-md-6 ">
                <h6 className="fs-5">{bookingInfo.futsalName}</h6>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{bookingInfo.address}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{bookingInfo.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Contact</th>
                      <td>{bookingInfo.contact}</td>
                    </tr>
                    <tr>
                      <th scope="row">Time</th>
                      <td>{bookingInfo.time}</td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>{bookingInfo.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <div className="card p-3 bg-warning-subtle">
                  <p className="fw-bold">Customer Details</p>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputFullName"
                      value={formData && formData.fullName ? formData.fullName : ""}
                      disabled={userId !== null}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          fullName: event.target.value,
                        }))
                      }
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputFullName">Fullname</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      value={formData && formData.email ? formData.email : ""}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      disabled={userId !== null}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputEmail">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputContact"
                      value={formData && formData.contact ? formData.contact : ""}
                      disabled={userId !== null}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact: event.target.value,
                        }))
                      }
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputContact">Contact</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleBooking}
            >
              Proceed Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
