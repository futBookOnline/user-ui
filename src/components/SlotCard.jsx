import React from "react";
import { Link } from "react-router-dom";

const SlotCard = (props) => {
  const { slotInfo, openModal } = props;
  let btnClass = slotInfo.isReserved ? "btn-danger disabled" : "btn-outline-success";
  return (
    <button
      type="button"
      className={`btn ${btnClass} px-4`}
      onClick={openModal}
    >
      <span>Rs. {slotInfo.price}</span>
      <br />
      {slotInfo.startTime} - {slotInfo.endTime}
    </button>
  );
};

export default SlotCard;
