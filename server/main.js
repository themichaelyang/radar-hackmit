'use strict';

let fs = require('fs');
let PeerServer = require('peer').PeerServer;

let server = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync('app/server.key'), // call server from base folder
    cert: fs.readFileSync('app/server.crt')
  }
});
