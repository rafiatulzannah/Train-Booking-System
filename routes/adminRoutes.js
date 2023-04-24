const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllTrainsController,
  changeTrainStatusController,
} = require("../controllers/adminControllers");
const router = express.Router();

//get METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//get METHOD || Trains
router.get("/getAllTrains", authMiddleware, getAllTrainsController);
//post METHOD || Trains
router.post("/changeTrainStatus", authMiddleware, changeTrainStatusController);
module.exports = router;
