import loginRouter from './login.route'
import postingRouter from './posting.route'
import paymentRouter from './payment.route'
import roomBookingRouter from './roomBooking.route'
//Common route which is present for all. This now calls the specific routes from the other module.

export default (app) => {
  app.use('/lacabana/users', loginRouter);
  app.use('/lacabana/postings', postingRouter);
//  app.use('/lacabana/payments', paymentRouter);
  app.use('/lacabana/bookings', roomBookingRouter);
};
