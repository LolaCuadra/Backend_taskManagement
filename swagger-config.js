const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./routes/*.js'];

const doc = {
  info: {
    title: 'Your API Title',
    description: 'Description of your API',
  },
  host: 'localhost:8080', 
  basePath: '/', 
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
