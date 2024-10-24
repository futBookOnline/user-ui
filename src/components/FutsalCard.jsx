import React from "react";
import { Link } from "react-router-dom";

const FutsalCard = ({ futsal }) => {
  return (
    <Link
      className="nav-link card"
      style={{ width: 200 }}
      to={`/futsal/${futsal.id}`}
    >
      <div className="bg-info-subtle d-flex justify-content-center">
        <img src={futsal.imageUrl} className="img-fluid  p-3" width={100} />
      </div>
      <div className="card-body">
        <h6>{futsal.futsalName}</h6>
        <small>
          {futsal.address}
        </small>
      </div>
    </Link>
  );
};

export default FutsalCard;
