const cors = require('cors')
const express = require('express');
const uuid = require('uuid').v4;
var cookieParser = require('cookie-parser');
const authRouter = require('./gateway/auth')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const PORT = 8000;

const app = express();
app.use(cors({
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json());
app.use(cookieParser());
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: true,
  rolling: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}))

// import routers from sub directory
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Running on port:${PORT}`);
});
