import React, {useState, useEffect} from 'react'
import Layout from '../layouts/Layout'
import FutsalCard from '../components/FutsalCard'
import { useRelatedApi } from '../helpers/api.helper'
import FutsalCardPlaceholder from '../components/FutsalCardPlaceholder'

const AllFutsal = () => {
  const[loadingFutsal, setLoadingFutsal] = useState(false)
  const [futsals, setFutsals] = useState(null);
  const fetchAllFutsals = async () => {
    const futsals = await useRelatedApi("futsals", "get", "");
    if (futsals) {
      setFutsals(futsals.data);
    }
  };
  useEffect(() => {
    fetchAllFutsals();
  }, []);
  return (
    <Layout>
      <h6>Futsals</h6>
        <hr />
        {loadingFutsal ? 
        <div className="d-flex flex-wrap mb-3">
          <FutsalCardPlaceholder />
          <FutsalCardPlaceholder />
          <FutsalCardPlaceholder />
          <FutsalCardPlaceholder />
        </div> :
        futsals && futsals.length > 0 ? (
          <div className="d-flex flex-wrap mb-3">
            {futsals.map((futsal) => (
              <FutsalCard key={futsal.id} futsal={futsal} />
            ))}
          </div>
        ) : (
          <p className="text-center py-5">There are no futsals</p>
        )}
    </Layout>
  )
}

export default AllFutsal