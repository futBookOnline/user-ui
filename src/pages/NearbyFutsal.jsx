import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper";
import FutsalCard from "../components/FutsalCard";
import FutsalCardPlaceholder from "../components/FutsalCardPlaceholder";

const NearbyFutsal = () => {
  const [loadingNearbyFutsal, setLoadingNearbyFutsal] = useState(true);
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
  useEffect(() => {
    getLocation();
  }, []);

  const [nearbyFutsals, setNearbyFutsals] = useState(null);
  const [radius, setRadius] = useState(1);
  const fetchNearbyFutsals = async () => {
    const response =
      location &&
      (await useRelatedApi(
        `futsals/nearby?longitude=${location.longitude}&latitude=${location.latitude}&radius=${radius}`,
        "get",
        ""
      ));
    if (response) {
      setNearbyFutsals(response.data);
      setLoadingNearbyFutsal(false);
    }
  };
  useEffect(() => {
    fetchNearbyFutsals();
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
      {loadingNearbyFutsal ? (
        <div className="d-flex flex-wrap mb-3">
          <FutsalCardPlaceholder />
          <FutsalCardPlaceholder />
          <FutsalCardPlaceholder />
          <FutsalCardPlaceholder />
        </div>
      ) : nearbyFutsals && nearbyFutsals.length > 0 ? (
        <div className="d-flex flex-wrap mb-3">
          {nearbyFutsals.map((futsal) => (
            <FutsalCard key={futsal.id} futsal={futsal} />
          ))}
        </div>
      ) : (
        <p className="text-center py-5">There are no nearby futsals</p>
      )}
    </Layout>
  );
};

export default NearbyFutsal;
