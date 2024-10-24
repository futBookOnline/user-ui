import React from "react";
import Layout from "../layouts/Layout";

const Event = () => {
  return (
    <Layout>
      <h6>Events</h6>
      <hr />
      <div className="py-5">
        <p className="text-center fs-4 fw-bold">
          New events will be available soon.
        </p>
        <div className="row my-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 d-flex flex-column align-items-center">
            <input placeholder="Enter your email" className="form-control" />
            <button className="btn btn-primary px-5 mt-3">Subscribe</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
