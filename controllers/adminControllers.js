const trainModel = require("../models/trainModel");

const userModel = require("../models/userModels");
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllTrainsController = async (req, res) => {
  try {
    const trains = await trainModel.find({});
    res.status(200).send({
      success: true,
      message: "trains data",
      data: trains,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching all the train data",
      error,
    });
  }
};

const changeTrainStatusController = async (req, res) => {
  try {
    const { trainId, status } = req.body;
    const train = await trainModel.findByIdAndUpdate(trainId, { status });
    const user = await userModel.findById({ _id: train.userId });
    const notification = user.notification;
    notification.push({
      type: "train-request-updated",
      message: `your train request is ${status}`,
      onClickPath: "/notification",
    });
    user.isTrain = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "train status updated",
      data: train,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in train status",
      error,
    });
  }
};
module.exports = {
  getAllTrainsController,
  getAllUsersController,
  changeTrainStatusController,
};
