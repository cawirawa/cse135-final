const cors = require('cors')
const express = require('express');
const uuid = require('uuid').v4;
var cookieParser = require('cookie-parser');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
var path = require("path")

const authRouter = require('./gateway/auth')
const staticRouter = require('./gateway/static')
const performanceRouter = require('./gateway/performance')
const activityRouter = require('./gateway/activity')
const commonRouter = require('./gateway/common')

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

var cssPath = path.join(__dirname, 'style');

app.use('/style', express.static(cssPath))

// import routers from sub directory
app.use('/api/user/', authRouter);
app.use('/api/static/', staticRouter);
app.use('/api/performance/', performanceRouter);
app.use('/api/activity/', activityRouter);
app.use('/', commonRouter);

app.listen(PORT, () => {
  console.log(`Running on port:${PORT}`);
});
