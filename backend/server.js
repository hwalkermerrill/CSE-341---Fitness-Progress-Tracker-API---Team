require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./DB/connection');
const app = express();
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const goalRoutes = require('./routes/goals');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Fitness Progress Tracker API is running!');
});

app.use(routes);

// 500 ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send(
        `<div>
            <h1>500 - Internal Service Error</h1>
        </div>`
    )
});

// 404 ERROR HANDLING
app.use((req, res) => {
    res.status(404).send(`
        <div>
            <h1>404 - Route Not Found</h1>
        </div>
    `)
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    }
});
