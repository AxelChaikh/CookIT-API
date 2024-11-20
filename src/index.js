import express from "express";
import RecipesRouter from "./routes/recipes.router.js";
import UsersRouter from "./routes/users.router.js";
import config from "./config.js";
import MongoConnection from "./models/MongoConnection.js";
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc'
require('dotenv').config();


const app = express();
const PORT = config.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/recipes", new RecipesRouter().start());
app.use("/users", new UsersRouter().start())

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CookIT API Documentation',
            version: '1.0.0',
            description: 'CookIT, tu API de recetas',
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ['./src/routes/*.router.js'],
}

const spacs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spacs));

await MongoConnection.connect()
app.listen(PORT, () =>
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
);

app.on("Error", (err) =>
    console.error("Hubo un problema con el servidor", err)
);

console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
