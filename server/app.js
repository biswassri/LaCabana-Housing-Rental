import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose, { mongo } from 'mongoose';
import routes from './routes';
import "core-js/stable";
import "regenerator-runtime/runtime";
import errorHandler from './handlers/errorhandler';

const MONGODV_URI = 'mongodb+srv://webdesign:webdesign1@lacabana.echsh.mongodb.net/lacabana?retryWrites=true&w=majority';
//This is used for a persisted MongoDB connection by using Mongoose ODM framework.
mongoose.connect(MONGODV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});
mongoose.Promise = global.Promise;

//Initializing the express framework in our app.
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//To allow all kinds of request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
  });

//Passing the application to include the routes.
routes(app);
// app.get('/', (req, res) => {
//     res.send('respond with a resource');
//   });
// global error handler
app.use(errorHandler);
  
export default app;
