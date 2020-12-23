const bodyParser = require('body-parser'); //module loader
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //logging of request


const app = express();

app.use(cors());

//Genral MiddleWares - Every Request is passed through these.
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Application Routing
//Middleware for logging body object from client
// app.use("/",(req, res, next)=>{
//     console.log(req.body);
   
//     res.send("Recieved");
// })


//adding various things in db
app.use("/add", require("./routes/addRoute"));
//Route for Retrieving Questions
app.use("/problems", require('./routes/problemRoute'));
//Route regarding
app.use("/accounts", require("./routes/registerRoute"), require("./routes/loginRoute"));

app.use("/validate", require('./routes/validatetokenroute'));

app.use("/compile", require('./routes/compileroute'));



app.listen(process.env.PORT || 3030, ()=>{
    console.log("server started");
})