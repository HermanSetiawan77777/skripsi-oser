var https = require('https');
var fs = require('fs');
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
let key = fs.readFileSync('server.key');
let cert = fs.readFileSync('server.cert');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//import
const userRoutes =require('./routes/ms_user')
//const authJWTRoutes =require('./routes/AuthJWT')
const scheduleRoutes =require('./routes/tr_schedule')
const projectrouted =require('./routes/ms_project')
const categoryrouteed =require('./routes/ms_category')
const servicesrouteed =require('./routes/ms_services')
const reviewrouted =require('./routes/tr_review')
const requestprices =require('./routes/tr_request_price')
const chatt =require('./routes/ms_chat')
const licenseRoute =require('./routes/ms_portofolio')
const getfiles =require('./routes/ms_file')
var cors = require('cors');

app.use((req, res, next) => {
  // enable CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers']
  );

  next();
});

//Enable CORS Pre-Flight
app.options('*', cors());
//routes sample
app.use(
    cors()
  );
app.use('/user',userRoutes)
//app.use('/authJWT/',authJWTRoutes)
app.use('/schedule/',scheduleRoutes)
app.use('/project/',projectrouted)
app.use('/category/',categoryrouteed)
app.use('/services/',servicesrouteed)
app.use('/review/',reviewrouted)
app.use('/requestprice/',requestprices)
app.use('/chat/',chatt)
app.use('/license/',licenseRoute)
app.use('/files/',getfiles)


//connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection

db.on('error',console.error.bind(console,'Databse Connection Error !!!'))
db.once('open',()=>{
    console.log('Database Is Connected')
})

//listen
https.createServer({ cert: cert, key: key }, app).listen(process.env.PORT,()=>{
    console.log('server running ini',process.env.PORT)
})
