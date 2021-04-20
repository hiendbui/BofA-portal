module.exports = {
  boxAppSettings: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    appAuth: {
      publicKeyID: "lmdedsaq",
      privateKey: process.env.PRIVATE_KEY,
      passphrase: process.env.PASSPHRASE
    }
  },
  enterpriseID: process.env.ENTERPRISE_ID
}