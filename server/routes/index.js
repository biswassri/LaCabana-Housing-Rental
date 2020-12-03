import loginRouter from './login.route';

//Common route which is present for all. This now calls the specific routes from the other module.
export default (app) => {
  app.use('/lacabana/login', loginRouter);
};
