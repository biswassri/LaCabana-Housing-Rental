import express from "express";
import PaymentController from "../controllers/payment.controller";
import LoginController from "../controllers/login.controller";

const paymentRouter = express.Router();

//for payment routing
// get - /
// post -accept/ : accept payments
// post - decline/ : decline payments
paymentRouter.route("").get(LoginController.authMiddleware, PaymentController.getPendingPayments);
paymentRouter.route("/accept").post(LoginController.authMiddleware, PaymentController.confirmPayment);
paymentRouter.route("/decline").post(LoginController.authMiddleware, PaymentController.declinePayment);

export default paymentRouter;