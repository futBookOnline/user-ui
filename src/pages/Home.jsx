import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper";
import FutsalCard from "../components/FutsalCard";

const Home = () => {
  const [futsals, setFutsals] = useState(null);
  const fetchAllFutsals = async () => {
    const futsals = await useRelatedApi("futsals", "get", "");
    if (futsals) {
      setFutsals(futsals.data);
    }
  };

  const [location, setLocation] = useState(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const [nearbyFutsals, setnearbyFutsals] = useState(null);
  const [radius, setRadius] = useState(1);
  const fetchAllNearbyFutsals = async () => {
    const nearbyFutsals =
      location &&
      (await useRelatedApi(
        `futsals/nearby?longitude=${location.longitude}&latitude=${location.latitude}&radius=${radius}`,
        "get",
        ""
      ));
    if (nearbyFutsals) {
      setnearbyFutsals(nearbyFutsals.data);
    }
  };
  useEffect(() => {
    fetchAllFutsals();
    getLocation();
  }, []);
  useEffect(() => {
    fetchAllNearbyFutsals();
  }, [location, radius]);
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <h6>Nearby Futsals</h6>
        <div className="mb-2">
          <span className="me-2">Radius</span>
          <select
            className="py-1 ps-5 pe-1"
            onChange={(event) => setRadius(event.target.value)}
          >
            <option value={1}>1 km</option>
            <option value={2}>2 km</option>
            <option value={3}>3 km</option>
            <option value={4}>4 km</option>
            <option value={5}>5 km</option>
          </select>
        </div>
      </div>

      <hr />

      {nearbyFutsals && nearbyFutsals.length > 0 ? (
        <div className="d-flex gap-4 flex-wrap mb-3">
          {nearbyFutsals.map((futsal) => (
            <FutsalCard key={futsal.id} futsal={futsal} />
          ))}
        </div>
      ) : (
        <p className="text-center py-5">There are no nearby futsals</p>
      )}
      <div className="row">
        <h6>Futsals</h6>
        <hr />
        {futsals && futsals.length > 0 ? (
          <div className="d-flex gap-4 flex-wrap mb-3">
            {futsals.map((futsal) => (
              <FutsalCard key={futsal.id} futsal={futsal} />
            ))}
          </div>
        ) : (
          <p className="text-center py-5">There are no futsals</p>
        )}
      </div>
      <div className="row">
        <h6>Events</h6>
        <hr />
        <p className="text-center py-5">There are no events.</p>
      </div>
    </Layout>
  );
};

export default Home;
