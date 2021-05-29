const cors = require('cors')
const express = require('express');
const authRouter= require('./gateway/auth')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const FileStore = require('session-file-store')(session)


const PORT = 3000;
const app = express();
app.use(cors({
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json());

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

app.use(passport.initialize());
app.use(passport.session());

// import routers from sub directory
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Running on port:${PORT}`);
});
