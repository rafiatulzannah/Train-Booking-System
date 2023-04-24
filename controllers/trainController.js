const trainModel = require("../models/trainModel");
const bookingModel = require("../models/bookingModel");
const userModel = require("../models/userModels");
const getTrainInfoController = async (req, res) => {
  try {
    const train = await trainModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "train data fetching successful",
      data: train,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching train details",
    });
  }
};

const updateTrainProfileController = async (req, res) => {
  try {
    const train = await trainModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "train profile updated",
      data: train,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "train profile update issue",
      error,
    });
  }
};

const getSingleTrainController = async (req, res) => {
  try {
    const train = await trainModel.findOne({ _id: req.body.trainId });
    res.status(200).send({
      success: true,
      message: "single train info fetched",
      data: train,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in single train info",
    });
  }
};

const ticketListController = async (req, res) => {
  try {
    const train = await trainModel.findOne({ userId: req.body.userId });
    const tickets = await bookingModel.find({ trainId: train._id });
    res.status(200).send({
      success: true,
      message: "train tickets fetched successful",
      data: tickets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in train ticket lists",
    });
  }
};
const updateStatusController = async (req, res) => {
  try {
    const { ticketsId, status } = req.body;
    const tickets = await bookingModel.findByIdAndUpdate(ticketsId, { status });
    const user = await userModel.findOne({ _id: tickets.userId });
    const notification = user.notification;
    notification.push({
      type: "status updated",
      message: `your ticket booking is ${status}`,
      onClickPath: "/train-tickets",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "ticket status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in update status",
    });
  }
};
module.exports = {
  getTrainInfoController,
  updateTrainProfileController,
  getSingleTrainController,
  ticketListController,
  updateStatusController,
};
