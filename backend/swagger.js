const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Fitness Progress Tracker API',
        description: 'API documentation for Fitness Progress',
    },
    host: 'cse-341-fitness-progress-tracker-api-team.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);