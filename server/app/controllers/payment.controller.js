
import Payment from "../models/payment.model";
import errorHandler from "../handlers/errorhandler";

const getPendingPayments = (req,res,next) =>{
    res.send(404);
};
const confirmPayment = (req,res,next) =>{
    res.send(404);
};
const declinePayment = (req,res,next) =>{
    res.send(404);
};
export default{
    getPendingPayments,
    confirmPayment,
    declinePayment
}