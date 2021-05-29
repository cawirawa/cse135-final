var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
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


const dbConnectionUrl = "mongodb+srv://admin2:Woiks123@cluster0.6oqd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(dbConnectionUrl, function (err, client) {
  db = client.db("mydb");
});

// JS Disallowed
app.get("/no-js", async function (req, res) {
  // console.log(req.headers)
  staticPayload = {
    userAgent: req.headers['user-agent'],
    language: "",
    acceptCookies: null,
    allowJavascript: false,
    allowImages: null, 
    allowCss: null, 
    screenDimension: '',
    windowDimension: '',
    networkConectionType: ''
  };

  result = await db.collection("static").insertOne(staticPayload);

  if (result["ops"] && result["ops"].length > 0) {
    res.status(201);
    res.send(result["ops"][0]);
  } else {
    res.status(500);
    res.send("Could not create new row.");
  }
});

// //user auth
// const users = [
//   {id: '2f24vvg', email: 'test@test.com', password: 'password'}
// ]


// // configure passport.js to use the local strategy
// passport.use(new LocalStrategy(
//   { usernameField: 'email' },
//   (email, password, done) => {
//     console.log('Inside local strategy callback')
//     // here is where you make a call to the database
//     // to find the user based on their username or email address
//     // for now, we'll just pretend we found that it was users[0]
//     const user = users[0] 
//     if(email === user.email && password === user.password) {
//       console.log('Local strategy returned true')
//       return done(null, user)
//     }
//   }
// ));

// // tell passport how to serialize the user
// passport.serializeUser((user, done) => {
//   console.log('Inside serializeUser callback. User id is save to the session file store here')
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log('Inside deserializeUser callback')
//   console.log(`The user id passport saved in the session file store is: ${id}`)
//   const user = users[0].id === id ? users[0] : false; 
//   done(null, user);
// });

// // add & configure middleware
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
// app.use(session({
//   genid: (req) => {
//     console.log('Inside the session middleware')
//     // console.log(req.sessionID)
//     return uuid() // use UUIDs for session IDs
//   },
//   store: new FileStore(),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// // create the homepage route at '/'
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback function')
//   // console.log(req.sessionID)
//   res.send(`You got home page!\n`)
//   // window.location.href="../index.html"
// })

// // create the login get and post routes
// app.get('/login', (req, res) => {
//   console.log('Inside GET /login callback function')
//   // console.log(req.sessionID)
//   res.send(`You got the login page!\n`)
//   window.location.href="index.html"
// })


// app.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if(info) {return res.send(info.message)}
//     if (err) { return next(err); }
//     if (!user) { return res.send('fail'); }
//     console.log('login');
//     req.login(user, (err) => {
//       console.log('login');
//       res.status(err ? 500 : 200).send(err ? err : user);
//     })
//   })(req, res, next);
// })

// app.get('/authrequired', (req, res) => {
//   console.log('Inside GET /authrequired callback')
//   console.log(`User authenticated? ${req.isAuthenticated()}`)
//   if(req.isAuthenticated()) {
//     res.send('you hit the authentication endpoint\n')
//   } else {
//     res.redirect('/')
//   }
// })

// ***STATIC***
app.get("/static", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  db.collection("static")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        result = result.slice(1, result.length)
      }
      res.send(result);
    });
});

app.get("/static/:id", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  db.collection("static").findOne(
    {
      _id: o_id,
    },
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/static", async function (req, res) {
  obj = req.body;
  result = await db.collection("static").insertOne(obj);

  if (result["ops"] && result["ops"].length > 0) {
    res.status(201);
    res.send(result["ops"][0]);
  } else {
    res.status(500);
    res.send("Could not create new row.");
  }
});

app.put("/static/:id", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  obj = req.body;
  result = await db
    .collection("static")
    .updateOne({ _id: o_id }, { $set: obj });
    // console.log(result ,
    //     result["result"] ,
    //     result["result"]["nModified"] ,
    //     result["result"]["nModified"] == 1)


  if (
    result &&
    result["result"] &&
    result["result"]["ok"]
  ) {
    db.collection("static").findOne(
      {
        _id: o_id,
      },
      function (err, result) {
        if (err) {
          res.status(500);
          res.send(err.message);
          return
        }
        res.send(result);
      }
    );
  } else {
    res.status(500);
    res.send("Update Error!");
  }
});


app.delete("/static/:id", async function (req, res) {
    var o_id = new ObjectId(req.params["id"]);
    obj = req.body;
    result = await db
      .collection("static")
      .deleteOne({ _id: o_id });
      if (result && result["deletedCount"] == 1) {
        res.status(200)
        res.send("Item with id ("+req.params["id"]+") deleted!")
      } else {
        res.status(500)
        res.send("Fail to delete item, item not found!")
      }
  });

// PERFORMANCE
app.get("/performance", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  db.collection("performance")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        result = result.slice(1, result.length)
      }
      res.send(result);
    });
});

app.get("/performance/:id", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  db.collection("performance").findOne(
    {
      _id: o_id,
    },
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/performance", async function (req, res) {
  obj = req.body;
  result = await db.collection("performance").insertOne(obj);
  if (result["ops"] && result["ops"].length > 0) {
    res.status(201);
    res.send(result["ops"][0]);
  } else {
    res.status(500);
    res.send("Could not create new row.");
  }
});

app.put("/performance/:id", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  obj = req.body;
  result = await db
    .collection("performance")
    .updateOne({ _id: o_id }, { $set: obj });
    // console.log(result ,
    //     result["result"] ,
    //     result["result"]["nModified"] ,
    //     result["result"]["nModified"] == 1)


  if (
    result &&
    result["result"] &&
    result["result"]["ok"]
  ) {
    db.collection("performance").findOne(
      {
        _id: o_id,
      },
      function (err, result) {
        if (err) {
          res.status(500);
          res.send(err.message);
          return
        }
        res.send(result);
      }
    );
  } else {
    res.status(500);
    res.send("Update Error!");
  }
});


app.delete("/performance/:id", async function (req, res) {
    var o_id = new ObjectId(req.params["id"]);
    obj = req.body;
    result = await db
      .collection("performance")
      .deleteOne({ _id: o_id });
      if (result && result["deletedCount"] == 1) {
        res.status(200)
        res.send("Item with id ("+req.params["id"]+") deleted!")
      } else {
        res.status(500)
        res.send("Fail to delete item, item not found!")
      }
  });

//Activity
app.get("/activity", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  db.collection("activity")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        result = result.slice(1, result.length)
      }
      res.send(result);
    });
});

app.get("/activity/:id", async function (req, res) {
  var o_id = new ObjectId(req.params["id"]);
  db.collection("activity").findOne(
    {
      _id: o_id,
    },
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/activity", async function (req, res) {
  obj = req.body;
  // console.log("activity")
  result = await db.collection("activity").insertOne(obj);
  if (result["ops"] && result["ops"].length > 0) {
    res.status(201);
    res.send(result["ops"][0]);
  } else {
    res.status(500);
    res.send("Could not create new row.");
  }
});

app.put("/activity/:id", async function (req, res) {
  let id  = req.params["id"]
  if (id === null ||id == undefined) {
    res.status(500);
    res.send("Invalid parameter (id)");
    return
  }
  var o_id = new ObjectId(req.params["id"]);
  obj = req.body;
  result = await db
    .collection("activity")
    .updateOne({ _id: o_id }, { $set: obj });
    // console.log(result ,
    //     result["result"] ,
    //     result["result"]["nModified"] ,
    //     result["result"]["nModified"] == 1)


  if (
    result &&
    result["result"] &&
    result["result"]["ok"]
  ) {
    db.collection("activity").findOne(
      {
        _id: o_id,
      },
      function (err, result) {
        if (err) {
          res.status(500);
          res.send(err.message);
          return
        }
        res.send(result);
      }
    );
  } else {
    res.status(500);
    res.send("Update Error!");
  }
});


app.delete("/activity/:id", async function (req, res) {
    var o_id = new ObjectId(req.params["id"]);
    obj = req.body;
    result = await db
      .collection("activity")
      .deleteOne({ _id: o_id });
      if (result && result["deletedCount"] == 1) {
        res.status(200)
        res.send("Item with id ("+req.params["id"]+") deleted!")
      } else {
        res.status(500)
        res.send("Fail to delete item, item not found!")
      }
  });



process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);


app.listen(4000);
