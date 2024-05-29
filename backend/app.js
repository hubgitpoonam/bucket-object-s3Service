const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/error")
const cookieParser = require('cookie-parser');

const { swaggerUi, specs } = require('./swagger');
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use(errorHandler);

app.use(cookieParser());


// Static file serving (for uploaded files)
app.use('/uploads', express.static('uploads'));

//importing router
const bucketRoute = require("./route/bucketRoute");
const objectsRouter = require('./route/objectRoute');
const userRouter = require('./route/userRoute');


app.use("/api",bucketRoute);
app.use('/api', objectsRouter);
app.use('/api', userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


module.exports = app;