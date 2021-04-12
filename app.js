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
const client = sdk.getAppAuthClient('enterprise');

var fs = require('fs');
var stream = fs.createReadStream('./HienBuiResume.pdf');
var folderID = '0'
client.files.uploadFile(folderID, 'HienBuiResume.pdf', stream)
	.then(fileObject => { console.log(fileObject) })
	.catch(error => {  console.log(error) });

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