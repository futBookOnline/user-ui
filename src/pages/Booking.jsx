import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper";
import BookingDetailModal from "../components/modals/BookingDetailModal";
const Booking = () => {
  const userId = localStorage.getItem("userId");

  const [todayReservations, setTodayReservations] = useState([]);
  const fetchTodaysReservations = async () => {
    const response =
      userId &&
      (await useRelatedApi(`reservations/${userId}/today`, "get", ""));
    if (response.success) {
      const updatedResponse =
        response.data &&
        response.data.map((reservation) => {
          reservation.date = new Date(reservation.date);
          return reservation;
        });
      setTodayReservations(updatedResponse);
    }
  };

  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const fetchUpcomingReservations = async () => {
    const response =
      userId &&
      (await useRelatedApi(`reservations/${userId}/upcoming`, "get", ""));
    if (response.success) {
      const updatedResponse =
        response.data &&
        response.data.map((reservation) => {
          reservation.date = new Date(reservation.date);
          return reservation;
        });
      setUpcomingReservations(updatedResponse);
    }
  };

  const [reservationHistory, setReservationHistory] = useState([]);
  const fetchReservationHistory = async () => {
    const response =
      userId &&
      (await useRelatedApi(`reservations/${userId}/history`, "get", ""));
    if (response.success) {
      const updatedResponse =
        response.data &&
        response.data.map((reservation) => {
          reservation.date = new Date(reservation.date);
          return reservation;
        });
      setReservationHistory(updatedResponse);
    }
  };

  useEffect(() => {
    fetchTodaysReservations();
    fetchUpcomingReservations();
    fetchReservationHistory();
  }, []);

  const [bookingInfo, setBookingInfo] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = (bookingInfo) => {
    setBookingInfo(bookingInfo);
    setShow(true);
  };

  const handleCancellation = () => {
    fetchTodaysReservations();
    fetchUpcomingReservations();
    setShow(false)
  }

  return (
    <Layout>
      <h6>My Bookings</h6>
      <hr />
      <div className="container row">
        {show && (
          <BookingDetailModal
            bookingInfo={bookingInfo}
            modalClose={() => setShow(false)}
            onCancellationSuccess={handleCancellation}
          />
        )}
        <div
          className="col-md-5 mb-4 border border-success bg-success-subtle rounded rounded-3 p-3"
          style={{ height: "35vh" }}
        >
          {todayReservations === undefined || todayReservations.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <span className="text-success">No bookings for today</span>
            </div>
          ) : (
            <>
              <table className="table table-sm table-hover table-success caption-top table-responsive">
                <caption className="text-success">Today's Booking</caption>
                <thead>
                  <tr>
                    <td scope="col">Futsal</td>
                    <td scope="col">Date</td>
                    <td scope="col">Time</td>
                  </tr>
                </thead>
                <tbody>
                  {todayReservations &&
                    todayReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        onClick={() => handleShow(reservation)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{reservation.futsalName}</td>
                        <td>
                          {reservation.date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>{reservation.time}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="col-md-1"></div>
        <div
          className="col-md-6 mb-4 border border-info bg-info-subtle rounded rounded-3 p-3"
          style={{ height: "35vh" }}
        >
          {upcomingReservations === undefined ||
          upcomingReservations.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <span className="text-info">No upcoming bookings</span>
            </div>
          ) : (
            <>
              <table className="table table-sm table-info table-hover caption-top table-responsive">
                <caption className="text-info">Upcoming Bookings</caption>
                <thead>
                  <tr>
                    <td scope="col">Futsal</td>
                    <td scope="col">Date</td>
                    <td scope="col">Time</td>
                  </tr>
                </thead>
                <tbody>
                  {upcomingReservations &&
                    upcomingReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        onClick={() => handleShow(reservation)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{reservation.futsalName}</td>
                        <td>
                          {reservation.date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>{reservation.time}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <div className="row mb-5">
        <div
          className="border border-primary bg-primary-subtle rounded rounded-3 p-3"
          style={{ height: "38vh" }}
        >
          {reservationHistory === undefined ||
          reservationHistory.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <span className="text-primary">No booking history</span>
            </div>
          ) : (
            <>
              <table className="table table-sm table-primary table-hover caption-top table-responsive">
                <caption className="text-primary">Booking History</caption>
                <thead>
                  <tr>
                    <td scope="col">Futsal</td>
                    <td scope="col">Date</td>
                    <td scope="col">Time</td>
                  </tr>
                </thead>
                <tbody>
                  {reservationHistory &&
                    reservationHistory.map((reservation) => (
                      <tr
                        key={reservation.id}
                        onClick={() => handleShow(reservation)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{reservation.futsalName}</td>
                        <td>
                          {reservation.date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>{reservation.time}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
