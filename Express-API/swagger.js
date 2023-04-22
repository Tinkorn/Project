const swaggerAutogen = require('swagger-autogen')()
const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:5000',
  schemes: ['http'],
  securityDefinitions: {
      bearerAuth: {
          type: 'apiKey',
          name: 'verify',
          scheme: 'bearer',
          in: 'header',
      },
  },
  security: [
      {
          bearerAuth: [],

      },
  ],

};
const outputFile = './swagger_output.json'
const endpointsFiles = ['./server.js']
swaggerAutogen(outputFile, endpointsFiles,doc)