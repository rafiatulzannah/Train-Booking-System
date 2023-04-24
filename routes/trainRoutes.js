const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getTrainInfoController,
  updateTrainProfileController,
  getSingleTrainController,
  ticketListController,
  updateStatusController,
} = require("../controllers/trainController");

const router = express.Router();

//post single train info
router.post("/getTrainInfo", authMiddleware, getTrainInfoController);
//post update profile
router.post(
  "/updateTrainProfile",
  authMiddleware,
  updateTrainProfileController
);

//post get single train info
router.post("/getSingleTrain", authMiddleware, getSingleTrainController);

router.get("/train-tickets", authMiddleware, ticketListController);

router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
