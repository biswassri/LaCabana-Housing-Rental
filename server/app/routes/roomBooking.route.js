import express from "express";
import roomBookingController from "../controllers/roomBooking.controller";
import LoginController from "../controllers/login.controller";

const roomBookingRouter = express.Router();

//to route for the bookings
roomBookingRouter.route("").post(LoginController.authMiddleware, roomBookingController.createBooking);
roomBookingRouter.route("/manage").get(LoginController.authMiddleware, roomBookingController.getUserBookings);

export default roomBookingRouter;
