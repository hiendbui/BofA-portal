const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const fs = require("fs");
const axios = require('axios')
const querystring = require('querystring');

const config = require('../../config/config.js');

let key = {
  key: config.boxAppSettings.appAuth.privateKey,
  passphrase: config.boxAppSettings.appAuth.passphrase
};

const authenticationUrl = "https://api.box.com/oauth2/token";

let claims = {
  iss: config.boxAppSettings.clientID,
  sub: config.enterpriseID,
  box_sub_type: "enterprise",
  aud: authenticationUrl,
  jti: crypto.randomBytes(64).toString("hex"),
  exp: Math.floor(Date.now() / 1000) + 45
};

let keyId = config.boxAppSettings.appAuth.publicKeyID

let headers = {
  'algorithm': 'RS512',
  'keyid': keyId,
}

let assertion = jwt.sign(claims, key, headers)

let accessToken;
axios.post(
    authenticationUrl,
    querystring.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: assertion,
        client_id: config.boxAppSettings.clientID,
        client_secret: config.boxAppSettings.clientSecret
    })
)
.then(response => accessToken = response.data.access_token)

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.send(accessToken);
})

module.exports = router;