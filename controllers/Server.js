/* eslint-disable global-require */

const express = require('express');
const { sequelize } = require('../models');
const { logExceptOnTest } = require('./Log');

class Server {
  constructor() {
    this.port = process.env.SERVER_PORT;
    this.app = express();
    this.database = sequelize;

    this.applyMiddlewares();
    this.loadRoutes();
  }

  applyMiddlewares() {
    // This middleware converts request to JSON
    this.app.use(express.json());
  }

  // Load all the routes the API accepts
  loadRoutes() {
    this.app.use('/posts', require('../routes/posts'));
  }

  async start() {
    try {
      // Sync the database with Sequelize
      await this.database.sync({ force: false });

      // Start to listen request, also save what it return that is
      // a server from the net module. This is used in testing
      this.netServer = this.app.listen(this.port, () =>
        logExceptOnTest(`API running at http://localhost:${this.port}`)
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

module.exports = Server;
