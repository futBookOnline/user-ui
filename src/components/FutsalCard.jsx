import React from "react";
import { Link } from "react-router-dom";

const FutsalCard = ({ futsal }) => {
  return (
    <Link
      className="nav-link col-6 col-md-2 col-lg-2 mb-4"
      to={`/futsal/${futsal.id}`}
    >
      <div className="card h-100">
        <div className="bg-info-subtle d-flex justify-content-center">
          <img src={futsal.imageUrl} className="img-fluid  p-3" width={100} />
        </div>
        <div className="card-body text-truncate">
          <small className="fs-5">{futsal.futsalName}</small><br />
          <small>{futsal.address}</small>
        </div>
      </div>
    </Link>
  );
};

export default FutsalCard;
