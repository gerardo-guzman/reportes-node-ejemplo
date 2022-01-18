require('dotenv').config();
const ServerCore = require('./core/server');

const server = new ServerCore();

server.listen();
