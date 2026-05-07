import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();



  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getFeed();
  }, []);

    if(!feed){
    return;
  }
  if(feed.length <=0){
    return <h1>No more users found</h1>
  }

  return (
    feed && (
      <div className="w-full min-h-screen bg-blue-500 flex flex-wrap items-center justify-center gap-5 p-5">
        <Usercard  user={feed[0]} />;
      </div>
    )
  );
};

export default Feed;
