import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Table } from "antd";
const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const getTickets = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-tickets", {
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
          {record.date} &nbsp;
          {record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1>Tickets</h1>
      <Table columns={columns} dataSource={tickets} />
    </Layout>
  );
};

export default Tickets;
