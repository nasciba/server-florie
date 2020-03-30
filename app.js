require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT;


const session = require('express-session');
const passport = require('passport');

require('./configs/passport.js');


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! `)
  })
  // Database name: "${x.connections[0].name}" pertence à linha 24
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
  const app_name = require('./package.json').name;
  const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
  
  const app = express();
  
// app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "a certain secret",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = 'Express - Generated with IronGenerator';



// app.use(
//   cors({
//     origin: ['https://florie.herokuapp.com'],
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [process.env.REACT_APP_FRONT],
    credentials: true,
  })
);



const index = require('./routes/index');
const productsRoutes = require('./routes/products-routes');
const fileUploadRoutes = require('./routes/file-routes');
const orderRoutes = require('./routes/order-routes')
app.use('/', index);
app.use('/api', productsRoutes);
app.use('/api', fileUploadRoutes);
app.use('/api', orderRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

module.exports = app;
