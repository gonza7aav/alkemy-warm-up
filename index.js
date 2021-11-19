/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

// Add the environment variables with dotenv
if (process.env.NODE_ENV === 'development') require('dotenv').config();
// In production it's assumed we used native environment variables

const Server = require('./controllers/Server');

const server = new Server();

server.start();
