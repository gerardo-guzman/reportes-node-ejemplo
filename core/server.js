const express = require("express");
const cors = require('cors');

const reportsRouter = require("../routes/reports.routes");

class ServerCore {

    connection;
    sqlConnection;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.connectDB();
        this.middleWares();
        this.routes();
    }

    middleWares() {
        // used middlewares!
        this.app.use(cors());
        this.app.use(express.json());
    }

    async connectDB() {

    }

    routes() {
        // the routes (just one)
        this.app.use('/api/v1.0/reportes', reportsRouter);
    }

    listen() {
        // Ha-ha just setting up the server
        this.connection = this.app.listen(this.port, () => {
            console.log(`Listen on ${this.port}`);
        });
    }

    stop() {
        // Stop manually the server for unit testing porposes
        return new Promise((resolve, reject) => {
            if (!this.connection) resolve(true);
            this.connection.close((err) => {
                if (err) reject(err);
                resolve(true);
            });
        })
    }
}

module.exports = ServerCore;
