const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const app = express();

const userRouter = require('./router/route');
const db = require('./db/db');
const db2 = require('./db/db2');
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'stock price API Documents',
      version: '1.0.0',
      description: 'API description'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./api-doc/**/*.yaml']
})

// db.activate(); // to execute function in db with csv file

db2.dbExport; // db with direct API

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/stocks',userRouter);

app.listen(3000, function(){
    console.log("...");
    });