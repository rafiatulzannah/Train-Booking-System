import React from "react";
import { useNavigate } from "react-router-dom";
const TrainList = ({ train }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/train/book-ticket/${train._id}`)}
      >
        <div className="card-header">Train name: {train.name}</div>
        <div className="card-body">
          <p>
            Ticket Price:
            <b> {train.price}</b>
          </p>
          <p>
            Train Starting Time:
            <b> {train.timings[0]}</b>
          </p>
          <p>
            Train Closing Time:
            <b> {train.timings[1]}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainList;
