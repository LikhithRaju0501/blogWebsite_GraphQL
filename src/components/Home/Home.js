import React from "react";

import { useQuery } from "@apollo/client";
import { GET_ALL_BLOGS } from "../GraphQL/queries";

import Cardcomp from "./Cardcomp";
import Techforumcomp from "./Techforumcomp";
import "./Home.css";

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_BLOGS);

  window.scrollTo(0, 0);
  return (
    <div>
      <Techforumcomp />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="allCards">
          {data?.blogs.map((item) => {
            return <Cardcomp key={item.id} blog={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
