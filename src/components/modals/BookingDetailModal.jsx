import React, { useState } from "react";
import { useRelatedApi } from "../../helpers/api.helper";

const BookingDetailModal = ({ bookingInfo, modalClose, onCancellationSuccess }) => {
  const [error, setError] = useState(null);
  // Function to remove the time part of a date
  const stripTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  const currentDate = stripTime(new Date());
  const reservedDate = stripTime(bookingInfo.date);
  const handleBookingCancellation = async () => {
    const response = await useRelatedApi(
      `reservations/${bookingInfo.id}/cancel`,
      "put",
      ""
    );
    if(response.success){
      onCancellationSuccess()
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
                <table className="table  table-borderless ">
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
                <div className="card p-3 bg-primary-subtle">
                  <table className="table table-primary caption-top table-borderless table-responsive">
                    <caption className="fw-bold text-dark text-center">
                      Booking Details
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">Date</th>
                        <td>
                          {bookingInfo.date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
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
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {reservedDate >= currentDate && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleBookingCancellation}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
