const express = require("express");
const {
  loginController,
  signupController,
  authController,
  addTrainController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllTrainController,
  bookTicketController,
  userTicketsController,
} = require("../controllers/userControllers");

const authMiddleware = require("../middlewares/authMiddleware");
//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/signup", signupController);

//auth || post
router.post("/getUserData", authMiddleware, authController);

//add trains || post
router.post("/add-trains", authMiddleware, addTrainController);

//notification || post
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//notification  delete|| post
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//get all trains
router.get("/getAllTrains", authMiddleware, getAllTrainController);

//book-ticket
router.post("/book-ticket", authMiddleware, bookTicketController);

//TICKET LIST
router.get("/user-tickets", authMiddleware, userTicketsController);
module.exports = router;
