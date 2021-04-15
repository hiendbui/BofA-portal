// const config = require('../../config');
// const BoxSDK = require('box-node-sdk');
// const sdk = BoxSDK.getPreconfiguredInstance(config);
// var authorize_url = sdk.getAuthorizeURL({
// 	response_type: 'code'
// });
// console.log(authorize_url)
// const client = sdk.getAppAuthClient('user', '15794584626');
// var client = sdk.getBasicClient('gZH3f1wduBDGdGylYy7olUzCFhv2dRQg');

// var fs = require('fs');
// var stream = fs.createReadStream('./HienBuiResume.pdf');
// client.folders.create('0', '0')
//   .then(folder => {console.log(folder)})
//   .catch(error => {  console.log(error) })
//client.enterprise.addUser(
    // null,
	// 'Ned Stark',
	// {
	// 	is_platform_access_only: true
	// }
    //)
// client.files.uploadFile('135508046790', 'HienBuiResume.pdf', stream)
// 	.then(fileObject => { console.log(fileObject) })
// 	.catch(error => {  console.log(error) });