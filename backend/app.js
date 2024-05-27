const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")

const { swaggerUi, specs } = require('./swagger');
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use(errorHandler);


//importing router
const bucketRoute = require("./route/bucketRoute");
const objectsRouter = require('./route/objectRoute');

app.use("/api",bucketRoute);
app.use('/api', objectsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


module.exports = app;