import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";
import Layout from "../layouts/Layout";
import SlotCard from "../components/SlotCard";
import BookingModal from "../components/modals/BookingModal";
import { socket } from "../App";

const Futsal = () => {
  const { id } = useParams();
  const [isBooked, setIsBooked] = useState(false);
  const [futsalData, setFutsalData] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const fetchFutsalData = async () => {
    const response = await useRelatedApi(`futsals/${id}`, "get", "");
    setFutsalData(response.data);
  };
  useEffect(() => {
    fetchFutsalData();
  }, []);

  const [slotData, setSlotData] = useState(null);
  const fetchSlotData = async () => {
    const response = await useRelatedApi(
      `slots/${id}?date=${currentDate}`,
      "get",
      ""
    );
    response && response.data && response.data.length > 0
      ? setSlotData(response.data)
      : setSlotData([]);
  };
  useEffect(() => {
    fetchSlotData();
  }, [currentDate, isBooked]);
  useEffect(() => {
    socket.on("reservation-added", fetchSlotData);
    socket.on("reservation-cancelled", fetchSlotData);
    return () => {
      socket.off("reservation-added");
      socket.off("reservation-cancelled");
    };
  }, []);

  const [bookingInfo, setBookingInfo] = useState(null);
  useEffect(() => {
    slotData &&
      futsalData &&
      setBookingInfo({
        futsalName: futsalData.futsalName,
        contact: futsalData.contact,
        email: futsalData.email,
        address: futsalData.address,
      });
  }, [slotData, futsalData]);
  const [show, setShow] = useState(false);
  const handleShow = (slotInfo) => {
    setShow(true);
    setBookingInfo((prev) => ({
      ...prev,
      slotId: slotInfo.id,
      time: `${slotInfo.startTime} - ${slotInfo.endTime}`,
      price: slotInfo.price,
    }));
  };
  const handleClose = () => setShow(false);
  const handleBooking = () => {
    setShow(false);
    setIsBooked(true);
  };
  return (
    <Layout>
      {show && (
        <BookingModal
          modalClose={handleClose}
          bookingSuccess={handleBooking}
          bookingInfo={bookingInfo}
        />
      )}
      <div className="col-md-6">
        {futsalData && (
          <table className="table">
            <tbody>
              <tr className="text-center">
                <td colSpan={2}>
                  <img
                    src={futsalData.imageUrl}
                    alt={futsalData.imageUrl}
                    height={200}
                  />
                </td>
              </tr>
              <tr>
                <th>Futsal Name</th>
                <td>{futsalData.futsalName}</td>
              </tr>
              <tr>
                <th>Futsal Address</th>
                <td>{futsalData.address}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{futsalData.email}</td>
              </tr>
              <tr>
                <th>Contact</th>
                <td>{futsalData.contact}</td>
              </tr>
              <tr>
                <th>Business Time</th>
                <td>
                  {futsalData.opensAt} to {futsalData.closesAt}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="col-md-6">
        <input
          type="date"
          className="form-control"
          id="datePicker"
          value={currentDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(event) => setCurrentDate(event.target.value)}
        />
        <hr />
        {slotData && slotData.length !== 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {slotData.map((slot) => (
              <SlotCard
                key={slot.id}
                slotInfo={slot}
                openModal={() => handleShow(slot)}
              />
            ))}
          </div>
        ) : (
          <div className="d-flex align-items-center h-100 justify-content-center">
            <p>No slots available</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Futsal;
