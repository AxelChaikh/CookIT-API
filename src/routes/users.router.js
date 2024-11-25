import UsersController from '../controllers/users.controller.js';
import express from 'express'
import { roleAuth } from '../middleware/roleAuth.js';

class UsersRouter {
    constructor() {
        this.controller = new UsersController();
        this.router = new express.Router();
    }

    start() {
        this.router.get("/id/:id", this.controller.getUserById)
        this.router.get("/users", this.controller.getAllusers)
        this.router.get("/username/:name", this.controller.getUserByUsername)
        this.router.get("/rol/:rol", this.controller.getUsersByRol)
        this.router.post("/newUser", this.controller.uploadNewUser)
        this.router.put("/update/restrictions/:id", this.controller.updateRestrictions)
        this.router.patch("/update/:id", this.controller.updateUser)
        this.router.delete("/delete/:id", roleAuth, this.controller.deleteUserById)
        this.router.patch("/update/addRecetaFavorita/:id", this.controller.addRecetaFavorita)
        this.router.patch("/update/removeRecetaFavorita/:id", this.controller.removeRecetaFavorita)

        return this.router;
    }
}

export default UsersRouter;




/**
 * @swagger
 * /users/users:
 *   get:
 *     summary: Traer todos los usuarios
 *     tags:
 *       - Users
 *     parameters:
 *       - name: role
 *         in: header
 *         required: true
 *         description: Se necesita rol "admin" para realizar la query.
 *         schema:
 *           type: string
 *           example: admin
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  {
 *                      "_id": "6737b35bf7320a530ade235b",
 *                      "username": "admin",
 *                      "pass": "admin",
 *                      "nombre": "algo",
 *                      "apellido": "apellido",
 *                      "informacion": "info",
 *                      "pronombre": "",
 *                      "favoritos": [],
 *                      "restricciones": [],
 *                      "rol": "admin"
 *                  }
 */
/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     summary: Trae un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Introduzca el ID del usuario a buscar
 *         schema:
 *           type: string
 *           example: 6737b35bf7320a530ade235b
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "_id": "6737b35bf7320a530ade235b",
 *                   "username": "admin",
 *                   "pass": "admin",
 *                   "nombre": "algo",
 *                   "apellido": "apellido",
 *                   "informacion": "info",
 *                   "pronombre": "",
 *                   "favoritos": [],
 *                   "restricciones": [],
 *                   "rol": "admin"
 *                 }
 */
/**
 * @swagger
 * /users/username/{name}:
 *   get:
 *     summary: Traer usuario por username
 *     tags:
 *       - Users
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Se necesita ingresar el nombre del usuario a buscar.
 *         schema:
 *           type: string
 *           example: vegan
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  {
 *                      "_id": "6737b35bf7320a530ade235b",
 *                      "username": "admin",
 *                      "pass": "admin",
 *                      "nombre": "algo",
 *                      "apellido": "apellido",
 *                      "informacion": "info",
 *                      "pronombre": "",
 *                      "favoritos": [],
 *                      "restricciones": [],
 *                      "rol": "admin"
 *                  }
 */
/**
 * @swagger
 * /users/rol/{rol}:
 *   get:
 *     summary: Traer todos los usuarios que coincidan con el rol
 *     tags:
 *       - Users
 *     parameters:
 *       - name: rol
 *         in: path
 *         required: true
 *         description: Se necesita ingresar el rol del usuario a buscar.
 *         schema:
 *           type: string
 *           example: user
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  {
 *                      "_id": "6737b35bf7320a530ade235b",
 *                      "username": "admin",
 *                      "pass": "admin",
 *                      "nombre": "algo",
 *                      "apellido": "apellido",
 *                      "informacion": "info",
 *                      "pronombre": "",
 *                      "favoritos": [],
 *                      "restricciones": [],
 *                      "rol": "admin"
 *                  }
 */
/**
 * @swagger
 * /users/newUser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Esta ruta permite crear un nuevo usuario.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               pass:
 *                 type: string
 *                 example: "admin"
 *               nombre:
 *                 type: string
 *                 example: "algo"
 *               apellido:
 *                 type: string
 *                 example: "apellido"
 *               informacion:
 *                 type: string
 *                 example: "info"
 *               pronombre:
 *                 type: string
 *                 example: ""
 *               favoritos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *               restricciones:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *               rol:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Usuario creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   example: true
 *                 insertedId:
 *                   type: string
 *                   example: "673bc713c6e2a52efa7cf1f9"
 */
/**
 * @swagger
 * /users/update/restrictions/{id}:
 *   patch:
 *     summary: Actualizar las restricciones de un usuario
 *     description: Esta ruta permite actualizar las restricciones de un usuario específico mediante su ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del usuario cuyo registro de restricciones se actualizará.
 *         schema:
 *           type: string
 *           example: "6737b35bf7320a530ade235b"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restricciones:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["vegan", "veggie", "gluten"]
 *                   description: "Las restricciones posibles son: 'vegan', 'veggie' y 'gluten'."
 *                 example: ["vegan"]
 *     responses:
 *       200:
 *         description: Restricciones actualizadas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   example: true
 *                 modifiedCount:
 *                   type: integer
 *                   example: 1
 *                 upsertedId:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 upsertedCount:
 *                   type: integer
 *                   example: 0
 *                 matchedCount:
 *                   type: integer
 *                   example: 1
 */
/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: Actualiza un usuario por id
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Introduzca la id del usuario a actualizar
 *         schema:
 *           type: string
 *           example: 673ab321f4380fd828133e45
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Jacob
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
 * /users/delete/{id}:
 *   delete:
 *     summary: Borra un usuario por id
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Introduzca la id a borrar
 *         schema:
 *           type: string
 *           example: 673bced894db3fcd70f1c97d
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












