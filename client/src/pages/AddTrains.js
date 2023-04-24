import React from "react";
import Layout from "./../components/Layout";
import { Form, Col, Row, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const AddTrains = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/add-trains",
        {
          ...values,
          userId: user._id,
          timings: [moment(values.timings[0]), moment(values.timings[1])],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Add Train</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <Row>
          <Col xs={24} md={24} lg={8} className="p-3">
            <Form.Item
              label="Name"
              name="name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="train name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="p-3">
            <Form.Item
              label="Ticket Price"
              name="price"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="ticket price" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8} className="p-3">
            <Form.Item label="Train Time" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default AddTrains;
