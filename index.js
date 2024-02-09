// EXPRESS SETUP
const express = require("express");
const app = express();
const port = 1000;

// MONGODB SETUP
require("./db/connect");

// MIDDLEWARE
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// SWAGGER IMPORT
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Learning Swagger From Tutorial',
            description: 'Learning all about Swagger',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${port}`
            },
        ]
    },
    apis: ['./routes/*.js'], // Path to the API routes directory or individual route files
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Example Route
app.use("/api", require("./routes/usersRoutes"));

app.get("/", (request, response) => {
    response.send("Server is running");
});

app.listen(port, () => {
    console.log(`Server Started At Port http://localhost:${port}`);
});
