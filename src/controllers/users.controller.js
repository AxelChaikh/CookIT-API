import UsersService from "../services/users.service.js";

class UsersController {
    constructor() {
        this.service = new UsersService();
    }

    getUserById = async (req, res) => {
        const { id } = req.params
        if (id == null) {
            res.status(400).send("Falta el id del usuario a buscar")
        } else {
            const user = await this.service.getUserById(id)
            res.status(200).send(user)
        }
    }
    getAllusers = async (req, res) => {
        const users = await this.service.getAllUsers();
        res.status(200).send(users);
    }

    getUserByUsername = async (req, res) => {
        const { name } = req.params
        if (name == null) {
            res.status(400).send("Falta el nombre del usuario a buscar")
        } else {
            const user = await this.service.getUserByUsername(name)
            res.status(200).send(user)
        }
    }
    deleteUserById = async (req, res) => {
        const { id } = req.params
        if (id == null) {
            res.status(400).send("Falta ID del usuario a borrar")
        } else {
            const deletedUser = await this.service.deleteUserById(id)
            res.status(200).send(deletedUser)
        }
    }

    getUsersByRol = async (req, res) => {
        const { rol } = req.params
        if (rol == null) {
            res.status(400).send("Falta el rol del usuario a buscar")
        } else {
            const user = await this.service.getUsersByRol(rol)
            res.status(200).send(user)
        }
    }

    uploadNewUser = async (req, res) => {
        const newUser = req.body
        if (JSON.stringify(newUser) === "{}") {
            res.status(400).send("El cuerpo no puede estar vacio")
        } else {
            const newUs = await this.service.uploadNewUser(newUser)
            res.status(200).send(newUs)
        }
    }
    
    updateRestrictions = async (req, res) => {
        // Postman:
        // {"restricciones":["vegan"]}
        const { id } = req.params;
        const data = req.body;
        //if (id == null) {
        //    res.status(400).send("ID inválido")
        //} else {
            const user = await this.service.updateRestrictions(id, data)
            res.status(200).send(user)
        //}
    }

    updateUser = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        if (id == null) {
            res.status(400).send("ID inválido")
        } else {
            const newUser = await this.service.updateUser(id, data);
            res.send(newUser);
        }
        
    }

    addRecetaFavorita = async (req, res) => {
        // postman: {"idRecetaOriginal": "6733b5239bee9ca353f3cd4c", "original": true}
        const { id } = req.params;
        const idRecetaFavorita = req.body;
        if (id == null) {
            res.status(400).send("ID inválido")
        } else {
            const newUser = await this.service.addRecetaFavorita(id, idRecetaFavorita);
            res.send(newUser);
        }

    }
    removeRecetaFavorita = async (req, res) => {
        // postman: {"idRecetaFavorita": "67437bd765a50da37609b9b9"}
        const { id } = req.params;
        const idRecetaFavorita = req.body.idRecetaFavorita;

        if (id == null) {
            res.status(400).send("ID inválido")
        } else {
            const newUser = await this.service.removeRecetaFavorita(id, idRecetaFavorita);
            res.send(newUser);
        }

    }

}

export default UsersController;