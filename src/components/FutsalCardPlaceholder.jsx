import React from "react";

const FutsalCardPlaceholder = () => {
  return (
    <div className="col-6 col-md-3 col-lg-2 mb-4" aria-hidden="true">
      <div className="card h-100">
        <img
          src="https://placehold.co/250x190?text=thumbnail"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body text-truncate">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
          </p>
        </div>
      </div>
    </div>
  );  
};

export default FutsalCardPlaceholder;
