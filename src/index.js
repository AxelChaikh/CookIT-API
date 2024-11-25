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
// Enable preflight for all routes
app.options('*', cors());

// Define CORS settings for specific routes
const corsOptions = {
    origin: '*', // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTION'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'role'], // Allowed headers
    credentials: true // Allow cookies or auth headers
};

// Apply CORS middleware to routes
app.use(cors(corsOptions));

// Example route
app.patch('/users/update/restrictions/:id', (req, res) => {
    const { id } = req.params;
    const { restricciones } = req.body;
    // Handle your logic here
    res.json({ success: true, id, restricciones });
});

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
