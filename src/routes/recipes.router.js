import RecipesController from "../controllers/recipes.controller.js";
import express from 'express'
import { roleAuth } from "../middleware/roleAuth.js";

class RecipesRouter {
    constructor() {
        this.router = new express.Router();
        this.controller = new RecipesController();
    }

    start() {
        this.router.get("/allRecipes", this.controller.getAllRecipes)
        this.router.get("/recipes/:id", this.controller.getRecipesById)
        this.router.get("/byRestrictions/:apto", this.controller.getRecipesByRestriction)
        this.router.get("/byIngredient/:ingredient", this.controller.getRecipesByIngredient)
        this.router.get("/byDifficulty/:difficulty", this.controller.getRecipesByDifficulty)
        this.router.post("/newRecipe", roleAuth, this.controller.uploadNewRecipe)
        this.router.patch("/update/:id", this.controller.updateRecipe)
        this.router.patch("/update/tags/:id", this.controller.updateTags)
        this.router.delete("/delete/:id", roleAuth, this.controller.deleteRecipeById)
        return this.router;
    }
}

export default RecipesRouter;



/**
 * @swagger
 * /recipes/allRecipes:
 *   get:
 *     summary: Buscar la lista completa de recetas
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                {
 *                   "_id": "6733b5239bee9ca353f3cd4b",
 *                   "name": "Pizza Margherita Clásica",
 *                   "ingredients": [
 *                     "Masa para pizza",
 *                     "Salsa de tomate",
 *                     "Queso mozzarella fresco",
 *                     "Hojas de albahaca fresca",
 *                     "Aceite de oliva",
 *                     "Sal y pimienta a gusto"
 *                   ],
 *                   "instructions": [
 *                     "Precalentar el horno a 245°C (475°F).",
 *                     "Estirar la masa para pizza y esparcir la salsa de tomate de manera uniforme.",
 *                     "Cubrir con rodajas de mozzarella fresca y hojas de albahaca.",
 *                     "Rociar con aceite de oliva y sazonar con sal y pimienta.",
 *                     "Hornear en el horno precalentado durante 12-15 minutos o hasta que la masa esté dorada.",
 *                     "Cortar en porciones y servir caliente."
 *                   ],
 *                   "prepTimeMinutes": 20,
 *                   "cookTimeMinutes": 15,
 *                   "servings": 4,
 *                   "difficulty": "Fácil",
 *                   "cuisine": "Italiana",
 *                   "caloriesPerServing": 300,
 *                   "tags": ["Pizza", "Italiana"],
 *                   "userId": 166,
 *                   "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
 *                   "rating": 4.6,
 *                   "reviewCount": 98,
 *                   "mealType": ["Cena"],
 *                   "apto": ["veggie"]
 *                 }
 */
/**
 * @swagger
 * /recipes/recipes/{id}:
 *   get:
 *     summary: Obtener receta por ID
 *     tags:
 *      - Recipes
 *     description: Devuelve una receta específica filtrada por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único de la receta.
 *         schema:
 *           type: string
 *           example: "6733b5239bee9ca353f3cd4b"
 *     responses:
 *       200:
 *         description: Receta específica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6733b5239bee9ca353f3cd4b"
 *                 name:
 *                   type: string
 *                   example: "Pizza Margarita Clásica"
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Masa para pizza", "Salsa de tomate", "Queso mozzarella fresco"]
 *                 instructions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "Precalentar el horno a 245°C (475°F).",
 *                     "Estirar la masa para pizza y esparcir la salsa de tomate de manera uniforme.",
 *                     "Cubrir con rodajas de mozzarella fresca y hojas de albahaca.",
 *                     "Rociar con aceite de oliva y sazonar con sal y pimienta.",
 *                     "Hornear en el horno precalentado durante 12-15 minutos o hasta que la masa esté dorada.",
 *                     "Cortar en porciones y servir caliente."
 *                   ]
 *                 prepTimeMinutes:
 *                   type: integer
 *                   example: 20
 *                 cookTimeMinutes:
 *                   type: integer
 *                   example: 15
 *                 servings:
 *                   type: integer
 *                   example: 4
 *                 difficulty:
 *                   type: string
 *                   example: "Fácil"
 *                 cuisine:
 *                   type: string
 *                   example: "Italiana"
 *                 caloriesPerServing:
 *                   type: integer
 *                   example: 300
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Pizza", "Italiana"]
 *                 userId:
 */
/**
 * @swagger
 * /recipes/byRestrictions/{apto}:
 *   get:
 *     summary: Obtener recetas por restricciones
 *     tags:
 *      - Recipes
 *     description: Devuelve una lista de recetas filtradas por una restricción específica (ej. veggie, gluten-free).
 *     parameters:
 *       - name: apto
 *         in: path
 *         required: true
 *         description: Restricción de las recetas.
 *         schema:
 *           type: string
 *           enum: [vegan, veggie, gf]
 *           example: veggie
 *     responses:
 *       200:
 *         description: Lista de recetas filtradas por restricción.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6733b5239bee9ca353f3cd4b"
 *                   name:
 *                     type: string
 *                     example: "Ensalada de Quinoa"
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Quinoa", "Pepino", "Tomate", "Cebolla roja"]
 *                   instructions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: [
 *                       "Cocinar la quinoa según las instrucciones del paquete.",
 *                       "Cortar el pepino, tomate y cebolla en cubos pequeños.",
 *                       "Mezclar todos los ingredientes en un bol grande.",
 *                       "Aliñar con aceite de oliva, sal y pimienta al gusto.",
 *                       "Servir frío o a temperatura ambiente."
 *                     ]
 *                   prepTimeMinutes:
 *                     type: integer
 *                     example: 15
 *                   cookTimeMinutes:
 *                     type: integer
 *                     example: 10
 *                   servings:
 *                     type: integer
 *                     example: 4
 *                   difficulty:
 *                     type: string
 *                     example: "Fácil"
 *                   cuisine:
 *                     type: string
 *                     example: "Mediterránea"
 *                   caloriesPerServing:
 *                     type: integer
 *                     example: 220
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Ensalada", "Vegana"]
 *                   userId:
 *                     type: integer
 *                     example: 166
 *                   image:
 *                     type: string
 *                     example: "https://cdn.dummyjson.com/recipe-images/2.webp"
 *                   rating:
 *                     type: number
 *                     example: 4.8
 *                   reviewCount:
 *                     type: integer
 *                     example: 54
 *                   mealType:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Almuerzo"]
 *                   apto:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["veggie", "gluten-free"]
 */
/**
 * @swagger
 * /recipes/byIngredient/{ingredient}:
 *   get:
 *     summary: Obtener recetas por ingrediente
 *     tags:
 *      - Recipes
 *     description: Devuelve una lista de recetas que contienen un ingrediente específico.
 *     parameters:
 *       - name: ingredient
 *         in: path
 *         required: true
 *         description: Ingrediente a buscar en las recetas.
 *         schema:
 *           type: string
 *           example: "Tomate"
 *     responses:
 *       200:
 *         description: Lista de recetas que contienen el ingrediente especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6733b5239bee9ca353f3cd4b"
 *                   name:
 *                     type: string
 *                     example: "Ensalada de Tomate y Albahaca"
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Tomate", "Albahaca", "Aceite de oliva"]
 *                   instructions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: [
 *                       "Lavar y cortar los tomates en rodajas.",
 *                       "Picar la albahaca fresca.",
 *                       "Mezclar todos los ingredientes en un bol.",
 *                       "Aliñar con aceite de oliva, sal y pimienta al gusto.",
 *                       "Servir inmediatamente."
 *                     ]
 *                   prepTimeMinutes:
 *                     type: integer
 *                     example: 10
 *                   cookTimeMinutes:
 *                     type: integer
 *                     example: 0
 *                   servings:
 *                     type: integer
 *                     example: 2
 *                   difficulty:
 *                     type: string
 *                     example: "Fácil"
 *                   cuisine:
 *                     type: string
 *                     example: "Mediterránea"
 *                   caloriesPerServing:
 *                     type: integer
 *                     example: 150
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Ensalada", "Vegetariana"]
 *                   userId:
 *                     type: integer
 *                     example: 166
 *                   image:
 *                     type: string
 *                     example: "https://cdn.dummyjson.com/recipe-images/3.webp"
 *                   rating:
 *                     type: number
 *                     example: 4.7
 *                   reviewCount:
 *                     type: integer
 *                     example: 34
 *                   mealType:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Almuerzo"]
 *                   apto:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["vegetariano"]
 */
/**
 * @swagger
 * /recipes/byDifficulty/{difficulty}:
 *   get:
 *     summary: Obtener recetas por dificultad
 *     tags:
 *      - Recipes
 *     description: Devuelve una lista de recetas filtradas por nivel de dificultad (fácil, medio, media, difícil).
 *     parameters:
 *       - name: difficulty
 *         in: path
 *         required: true
 *         description: Nivel de dificultad de las recetas.
 *         schema:
 *           type: string
 *           enum: [fácil, medio, media, difícil]
 *           example: fácil
 *     responses:
 *       200:
 *         description: Lista de recetas filtradas por dificultad.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6733b5239bee9ca353f3cd4b"
 *                   name:
 *                     type: string
 *                     example: "Pizza Margarita Clásica"
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Masa para pizza", "Salsa de tomate", "Queso mozzarella fresco"]
 *                   instructions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: [
 *                       "Precalentar el horno a 245°C (475°F).",
 *                       "Estirar la masa para pizza y esparcir la salsa de tomate de manera uniforme.",
 *                       "Cubrir con rodajas de mozzarella fresca y hojas de albahaca.",
 *                       "Rociar con aceite de oliva y sazonar con sal y pimienta.",
 *                       "Hornear en el horno precalentado durante 12-15 minutos o hasta que la masa esté dorada.",
 *                       "Cortar en porciones y servir caliente."
 *                     ]
 *                   prepTimeMinutes:
 *                     type: integer
 *                     example: 20
 *                   cookTimeMinutes:
 *                     type: integer
 *                     example: 15
 *                   servings:
 *                     type: integer
 *                     example: 4
 *                   difficulty:
 *                     type: string
 *                     example: "Fácil"
 *                   cuisine:
 *                     type: string
 *                     example: "Italiana"
 *                   caloriesPerServing:
 *                     type: integer
 *                     example: 300
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Pizza", "Italiana"]
 *                   userId:
 *                     type: integer
 *                     example: 166
 *                   image:
 *                     type: string
 *                     example: "https://cdn.dummyjson.com/recipe-images/1.webp"
 *                   rating:
 *                     type: number
 *                     example: 4.6
 *                   reviewCount:
 *                     type: integer
 *                     example: 98
 *                   mealType:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Cena"]
 *                   apto:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["veggie"]
 */
/**
 * @swagger
 * /recipes/newRecipe:
 *   post:
 *     summary: Crear una nueva receta
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: role
 *         in: header
 *         required: true
 *         description: Se necesita rol "admin" para realizar la query.
 *         schema:
 *           type: string
 *           example: admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pizza Margherita Clásica"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Masa para pizza", "Salsa de tomate", "Queso mozzarella fresco"]
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [
 *                   "Precalentar el horno a 245°C (475°F).",
 *                   "Estirar la masa para pizza y esparcir la salsa de tomate de manera uniforme.",
 *                   "Cubrir con rodajas de mozzarella fresca y hojas de albahaca.",
 *                   "Rociar con aceite de oliva y sazonar con sal y pimienta.",
 *                   "Hornear en el horno precalentado durante 12-15 minutos o hasta que la masa esté dorada.",
 *                   "Cortar en porciones y servir caliente."
 *                 ]
 *               prepTimeMinutes:
 *                 type: integer
 *                 example: 20
 *               cookTimeMinutes:
 *                 type: integer
 *                 example: 15
 *               servings:
 *                 type: integer
 *                 example: 4
 *               difficulty:
 *                 type: string
 *                 example: "Fácil"
 *               cuisine:
 *                 type: string
 *                 example: "Italiana"
 *               caloriesPerServing:
 *                 type: number
 *                 example: 300
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Pizza", "Italiana"]
 *               userId:
 *                 type: integer
 *                 example: 166
 *               image:
 *                 type: string
 *                 example: "https://cdn.dummyjson.com/recipe-images/1.webp"
 *               rating:
 *                 type: number
 *                 example: 4.6
 *               reviewCount:
 *                 type: integer
 *                 example: 98
 *               mealType:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Cena"]
 *               apto:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["veggie"]
 *     responses:
 *       200:
 *         description: Receta creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "_id": "6733b5239bee9ca353f3cd4b",
 *                   "name": "Pizza Margherita Clásica",
 *                   "ingredients": [
 *                     "Masa para pizza",
 *                     "Salsa de tomate",
 *                     "Queso mozzarella fresco",
 *                     "Hojas de albahaca fresca",
 *                     "Aceite de oliva",
 *                     "Sal y pimienta a gusto"
 *                   ],
 *                   "instructions": [
 *                     "Precalentar el horno a 245°C (475°F).",
 *                     "Estirar la masa para pizza y esparcir la salsa de tomate de manera uniforme.",
 *                     "Cubrir con rodajas de mozzarella fresca y hojas de albahaca.",
 *                     "Rociar con aceite de oliva y sazonar con sal y pimienta.",
 *                     "Hornear en el horno precalentado durante 12-15 minutos o hasta que la masa esté dorada.",
 *                     "Cortar en porciones y servir caliente."
 *                   ],
 *                   "prepTimeMinutes": 20,
 *                   "cookTimeMinutes": 15,
 *                   "servings": 4,
 *                   "difficulty": "Fácil",
 *                   "cuisine": "Italiana",
 *                   "caloriesPerServing": 300,
 *                   "tags": ["Pizza", "Italiana"],
 *                   "userId": 166,
 *                   "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
 *                   "rating": 4.6,
 *                   "reviewCount": 98,
 *                   "mealType": ["Cena"],
 *                   "apto": ["veggie"]
 *                 }
 */
/**
 * @swagger
 * /recipes/update/{id}:
 *   patch:
 *     summary: Actualiza una receta por id
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Introduzca la id de la receta a actualizar
 *         schema:
 *           type: string
 *           example: 6733b5239bee9ca353f3cd4b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la receta
 *                 example: Pollo
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "acknowledged": true,
 *                   "modifiedCount": 1
 *                 }
 */
/**
 * @swagger
 * /recipes/update/tags/{id}:
 *   patch:
 *     summary: Actualiza los tags de una receta por id
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Introduzca la id de la receta a actualizar
 *         schema:
 *           type: string
 *           example: 6733b5239bee9ca353f3cd4b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 description: Lista de nuevos tags
 *                 items:
 *                   type: string
 *                 example: ["Pollo", "Cena rápida", "Saludable"]
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "acknowledged": true,
 *                   "modifiedCount": 1
 *                 }
 */
/**
 * @swagger
 * /recipes/delete/{id}:
 *   delete:
 *     summary: Borra una receta por id
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Introduzca la id a borrar
 *         schema:
 *           type: string
 *           example: 6733b5239bee9ca353f3cd4b
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: onject
 *               example:
 *                  {
 *                      "acknowledged": true,
 *                      "deletedCount": 1
 *                  }
 */














