import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const TrainTickets = () => {
  const [tickets, setTickets] = useState([]);
  const getTickets = async () => {
    try {
      const res = await axios.get("/api/v1/train/train-tickets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setTickets(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/train/update-status",
        { ticketsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getTickets();
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {record.date} &nbsp; {record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success ms-2"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Tickets</h1>
      <Table columns={columns} dataSource={tickets} />
    </Layout>
  );
};

export default TrainTickets;
