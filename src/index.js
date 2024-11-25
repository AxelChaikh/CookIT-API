import express from "express";
import RecipesRouter from "./routes/recipes.router.js";
import UsersRouter from "./routes/users.router.js";
import config from "./config.js";
import MongoConnection from "./models/MongoConnection.js";
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();





const app = express();
const PORT = config.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (err) {
            throw new Error('Invalid JSON');
        }
    }
}));
// Configuración de CORS
app.use(cors({
    origin: '*', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'role'] // Encabezados permitidos
}));

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
                url: "",
            },
        ],
    },
    apis: ['./src/routes/*.router.js'],
}

const spacs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spacs));

await MongoConnection.connect()
app.listen(PORT, () =>
    console.log(`Servidor corriendo en: https://cookit-api.up.railway.app`)
);

app.on("Error", (err) =>
    console.error("Hubo un problema con el servidor", err)
);

console.log(`Swagger Docs available at https://cookit-api.up.railway.app/api-docs/`);
