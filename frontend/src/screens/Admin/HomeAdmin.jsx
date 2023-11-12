import React, { useEffect, useState } from "react";
import { GiVote } from "react-icons/gi";
import { CiNoWaitingSign } from "react-icons/ci";
import { toast } from "react-toastify";
import {
  useGetVoteCountMutation,
  useGetAllLocationsMutation,
} from "../../slices/userApiSlice";
import BarCharts from "../../components/BarCharts";

function HomeAdmin() {
  const [getVoteCount, { isLoading }] = useGetVoteCountMutation();
  const [getAllLocations] = useGetAllLocationsMutation();

  const [voteCount, setVoteCount] = useState();
  const [voteLocationsCount, setVoteLocationsCount] = useState();

  const votingCount = async () => {
    try {
      const res = await getVoteCount().unwrap();
      // const res2 = await getAllLocations().unwrap();
      // console.log(res2);
      setVoteCount(res);
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  const votingLocationsCount = async () => {
    try {
      const res = await getAllLocations().unwrap();
      // console.log(res);
      setVoteLocationsCount(res);
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    votingCount();
    votingLocationsCount();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 id="home-title">DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card firstcard">
          <div className="card-inner">
            <h3 className="text1">VOTED</h3>
            <GiVote className="card_icon" />
          </div>
          <h1 className="text2">{voteCount?.vote}</h1>
        </div>
        <div className="card secondcard">
          <div className="card-inner">
            <h3 className="text1">NOT VOTED</h3>
            <CiNoWaitingSign className="card_icon" />
          </div>
          <h1 className="text2">{voteCount?.notVote}</h1>
        </div>
      </div>

      <div className="PieCharts">
        {voteLocationsCount ? (
          <BarCharts data={voteLocationsCount.data} />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

export default HomeAdmin;
