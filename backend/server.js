const app = require("./app");

const http = require("http");

const server = http.createServer(app);

const dotenv = require('dotenv');

dotenv.config({path:"backend/config/config.env"})

const connectDatabase = require('../backend/config/database');
connectDatabase();


server.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})