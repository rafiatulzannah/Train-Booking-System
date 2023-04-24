import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import TrainList from "../components/TrainList";

const Homepage = () => {
  const [trains, setTrains] = useState([]);
  //LOGIN USER DATA
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllTrains",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setTrains(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Homepage</h1>
      <Row>{trains && trains.map((train) => <TrainList train={train} />)}</Row>
    </Layout>
  );
};

export default Homepage;
