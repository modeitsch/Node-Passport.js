const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//Connect

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongoDB Connected..."))
    .catch(err => console.log(err));




// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//bodyParser 
app.use(express.urlencoded({ extended: false }));




//Express Session 

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  

  // Passport Js
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash())

  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Hello ${PORT}`))