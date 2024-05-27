// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'S3-like Service API',
      version: '1.0.0',
      description: 'API documentation for the S3-like service',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./backend/routes/*.js'], // Path to the API docs
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };
