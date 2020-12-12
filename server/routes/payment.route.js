const express = require("express");
const PaymentController = require("../controllers/payment.controller");
const LoginController = require("../controllers/login.controller");

const paymentRouter = express.Router();

paymentRouter.get("", LoginController.authMiddleware, PaymentController.getPendingPayments);
paymentRouter.post("/accept", LoginController.authMiddleware, PaymentController.confirmPayment);
paymentRouter.post("/decline", LoginController.authMiddleware, PaymentController.declinePayment);

export default paymentRouter;