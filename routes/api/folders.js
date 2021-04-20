const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../../config');
const BoxSDK = require('box-node-sdk');
const sdk = BoxSDK.getPreconfiguredInstance(config);
const client = sdk.getAppAuthClient('enterprise');


router.post('/', (req, res) => {
	const parentFolderId = req.body.parentFolderId.toString();
	const folderPrefix = `${req.body.appType} Application`;
	const date = new Date();
	const now = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
	const folderName = folderPrefix + ' ' + now;
    client.folders.create(parentFolderId, folderName)
  		.then(response => {res.send(response.id)})
  		.catch(error => {  console.log(error) })
})

router.delete('/', (req, res) => {
	client.folders.delete(req.body.folderId.toString(), {recursive: true})
		.then(() => {
            res.json({ id: req.params.id, message: 'Deleted!' });
        })
})

module.exports = router;