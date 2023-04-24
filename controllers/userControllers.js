const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const trainModel = require("../models/trainModel");
const bookingModel = require("../models/bookingModel");

//register callback
const signupController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "auath error", success: false, err });
  }
};

const addTrainController = async (req, res) => {
  try {
    const newTrain = await trainModel({ ...req.body, status: "pending" });
    await newTrain.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "add-train-request",
      message: `${newTrain.name} has been added`,
      data: {
        trainId: newTrain._id,
        name: newTrain.name,
        onClickPath: "/admin/trains",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(201)
      .send({ success: true, message: "train added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while adding a new train",
    });
  }
};

//notification controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in notification",
      success: false,
      error,
    });
  }
};

//delete notificaions
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "notification deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};
const getAllTrainController = async (req, res) => {
  try {
    const trains = await trainModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "train list fetched successfully",
      data: trains,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while fetching train",
    });
  }
};

//book ticket controller
const bookTicketController = async (req, res) => {
  try {
    req.body.status = "pending";
    const bookTicket = new bookingModel(req.body);
    await bookTicket.save();
    const user = await userModel.findOne({ _id: req.body.trainInfo.userId });
    user.notification.push({
      type: "new-ticket-booking-req",
      message: `A new ticket booked by ${req.body.userInfo.name}`,
      onClickPath: "/user/book-ticket",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "ticket booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while booking ticket",
    });
  }
};

//ticket list controller
const userTicketsController = async (req, res) => {
  try {
    const ticketList = await bookingModel.find({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "users tickets fetch successfully",
      data: ticketList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in ticket lists",
    });
  }
};

module.exports = {
  loginController,
  signupController,
  authController,
  addTrainController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllTrainController,
  bookTicketController,
  userTicketsController,
};
