import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const getTrains = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllTrains", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setTrains(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle account
  const handleTrainStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeTrainStatus",
        { trainId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
  useEffect(() => {
    getTrains();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Ticket Price",
      dataIndex: "price",
    },
    {
      title: "Timings",
      dataIndex: "timings",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleTrainStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>All Trains </h1>
      <Table columns={columns} dataSource={trains} />
    </Layout>
  );
};

export default Trains;
