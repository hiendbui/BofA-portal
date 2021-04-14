const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const db = require("./config/keys").mongoURI;
// const users = require("./routes/api/users");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const config = require('./config');
const BoxSDK = require('box-node-sdk');
const sdk = BoxSDK.getPreconfiguredInstance(config);
// var authorize_url = sdk.getAuthorizeURL({
// 	response_type: 'code'
// });
// console.log(authorize_url)
const client = sdk.getAppAuthClient('user', '15794584626');
// var client = sdk.getBasicClient('gZH3f1wduBDGdGylYy7olUzCFhv2dRQg');

var fs = require('fs');
var stream = fs.createReadStream('./HienBuiResume.pdf');
client.folders.create('0', '0')
  .then(folder => {console.log(folder)})
  .catch(error => {  console.log(error) })

// client.files.uploadFile('0', 'HienBuiResume.pdf', stream)
// 	.then(fileObject => { console.log(fileObject) })
// 	.catch(error => {  console.log(error) });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// mongoose
//     .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB successfully"))
//     .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ 
    extended: false
}));
app.use(bodyParser.json());


// app.use("/api/users", users);
app.use(passport.initialize());
// require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});