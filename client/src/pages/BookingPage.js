import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [trains, setTrains] = useState([]);
  const params = useParams();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  //LOGIN USER DATA
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/train/getSingleTrain",
        { trainId: params.trainId },
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

  //============================booking func======================
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-ticket",
        {
          trainId: params.trainId,
          userId: user._id,
          trainInfo: trains,
          date: date,
          time: time,
          userInfo: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Ticket Booking Page</h1>
      <div className="container">
        {trains && (
          <div>
            <h4> Train Name: {trains.name}</h4>
            <h4> Ticket Price: {trains.price}</h4>
            {/* <h4>
              Timing: {trains.timings[0]} - {trains.timings[1]}
            </h4> */}
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => setDate(value)}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => setTime(value)}
              />
              <button
                className="btn btn-dark"
                type="submit"
                onClick={handleBooking}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
