import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose, { mongo } from 'mongoose';
import routes from './routes';
import "core-js/stable";
import "regenerator-runtime/runtime";

const errorHandler = require('./handlers/errorhandler');

const MONGODV_URI = 'mongodb+srv://webdesign:webdesign1@lacabana.echsh.mongodb.net/lacabana?retryWrites=true&w=majority';

mongoose.connect(MONGODV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});
mongoose.Promise = global.Promise;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

routes(app);

app.use(errorHandler);
  
export default app;
