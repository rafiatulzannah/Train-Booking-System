import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Form, Col, Row, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";

const TrainProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [train, setTrain] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //update train
  const handleFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/train/updateTrainProfile",
        {
          ...values,
          userId: user._id,
          timings: [values.timings[0], values.timings[1]],
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

  //get train details
  const getTrainInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/train/getTrainInfo",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setTrain(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrainInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Manage Train</h1>
      {train && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...train,
            timings: [train.timings[0], train.timings[1]],
          }}
        >
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
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default TrainProfile;
