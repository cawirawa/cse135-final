var express = require("express");
//for user authen
const uuid = require('uuid').v4;
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//create server
var app = express();
app.use(express.json());
const FileStore = require('session-file-store')(session);

//user auth
const users = [
  {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('Inside local strategy callback')
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    const user = users[0] 
    if(email === user.email && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
    else return done(null, false, { message: 'bad password' })
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false; 
  done(null, user);
});

// add & configure middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    // console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  // console.log(req.sessionID)
  res.send(`You got home page!\n`)
  // window.location.href="../index.html"
})

// create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  // console.log(req.sessionID)
  res.send(`You got the login page!\n`)
  // window.location.href="index.html"
})


app.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    // if (err){
    //   console.log('wrong cred')
    //   res.status(500)
    //   return res.send("wrong credentials")
    // }
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      if (err){
        console.log('wrong cred2')
        res.status(500)
        // res.send("wrong credentials")
        const response = {};
        response.alerts = err.message
        return res.status(err.status || 500).json(response)
        // res.redirect('/')
        // return res.end('Cannot ' + req.method + ' ' + req.url);
      }
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      // return res.send('You were authenticated & logged in!\n');
      return res.redirect('/dev-api/authrequired')
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback')
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  if(req.isAuthenticated()) {
    // res.send('you hit the authentication endpoint\n')
    res.setHeader("Content-Type", "text/html")
    res.redirect('/index2.html')
  } else {
    res.redirect('/')
  }
})

process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);


app.listen(5000);
