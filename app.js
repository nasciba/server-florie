require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');

require('./configs/passport.js');


mongoose
  .connect('mongodb://localhost/server-florie', { useNewUrlParser: true })
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

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// ADD SESSION SETTINGS HERE:
app.use(session({
  secret: "a certain secret",
  resave: true,
  saveUninitialized: true
}));

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// app.use(cors())

// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);
app.use('/api', require('./routes/auth-routes.js'));

//AUTH routes
const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

module.exports = app;
