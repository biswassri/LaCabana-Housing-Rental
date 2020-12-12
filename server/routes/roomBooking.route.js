const express = require("express");
const roomBookingController = require("../controllers/roomBooking.controller");
const LoginController = require("../controllers/login.controller");

const router = express.Router();

router.post("", userController.authMiddleware, roomBookingController.createBooking);
router.get("/manage", userController.authMiddleware, roomBookingController.getUserBookings);

export default router;
