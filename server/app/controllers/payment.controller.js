
import Payment from "../models/payment.model";
import errorHandler from "../handlers/errorhandler";
import PaymentService from '../services/payment.service';
import postingService from "../services/posting.service";
import paymentService from "../services/payment.service";


const getPendingPayments = async (req,res,next) =>{
    const user = res.locals.user;

    try{
        var pay = await PaymentService.getPendingPayments(user);
        if (pay)
            return res.json(pay);
        else 
            return res.status(422).send({
                errors: [{ title: "Payments Error", detail: "Could not get Payments" }]
              })
    }
    catch (err){
        return res.status(422).send({
            errors: [{ title: "Payments Error", detail: err }]
          })
    }

};

const confirmPayment = async (req,res,next) =>{
    const payment = req.body;
    const user = res.locals.user;

   try{ 
       console.log("Here");
       var pay = await PaymentService.confirmPayment(payment, user);
       console.log(pay);
       if (pay){

        return res.json({ status: "paid" });
       }
       else {
           return res.status(422).send({
            errors: [{ title: "Payments Error", detail: "Could not accept payment" }]
          })
        }
    }
   catch(err){
       console.log(err);
        return res.status(422).send({
        errors: [{ title: "Payments Error", detail: "Could not accept payment" }]
    })
    }
    
};
const declinePayment = (req,res,next) =>{
    const payment = req.body;
    try{
        var pay = paymentService.declinePayment(payment);
        if (pay == "Declined"){
            return res.json({ status: "declined" });
        }
        else 
        return res.status(422).send({
            errors: [{ title: "Payments Error", detail: "Could not decline payment" }]
        })
    }
    catch(err){
        console.log(err);
        return res.status(422).send({
        errors: [{ title: "Payments Error", detail: "Could not decline payment" }]
    })
    }
};
export default{
    getPendingPayments,
    confirmPayment,
    declinePayment
}