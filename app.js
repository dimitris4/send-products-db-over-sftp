const Client = require('ssh2-sftp-client');
const sftp = new Client();
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USERNAME_STORAGE,
    password: process.env.PASSWORD
}

console.log('config = ', config);

const name = 'products.db' 
const pathToFile = path.join(__dirname, `/${name}`)
const data = fs.createReadStream(pathToFile);
console.log('data = ', data);
const remote = `/${name}`;

sftp.connect(config).then(() => {
    return sftp.put(data, remote);
}).then(data => {
  console.log(data, 'the data info');
}).catch(err => {
  console.log(err, 'catch error');
});