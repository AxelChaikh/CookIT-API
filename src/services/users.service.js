import Factory from "../models/DAO/Factory.js"
import config from "../config.js"
import { validateUser } from "../validate/schema.js"
class UsersService {
    constructor() {
        this.model = Factory.get(config.PERSISTENCE).users
    }
    getUserById = async (id) => {
        return await this.model.getUserById(id)
    }

    getAllUsers = async () => {
        return await this.model.getAllUsers()
    }

    getUserByUsername = async (name) => {
        return await this.model.getUserByUsername(name)
    }

    deleteUserById = async (id) => {
        return await this.model.deleteUserById(id)
    }
    getUsersByRol = async (rol) => {
        return await this.model.getUsersByRol(rol)
    }

    uploadNewUser = async (user) => {
        const validate = validateUser(user)
        const newUser = validate.error ? validate.errorMessage : await this.model.uploadNewUser(user)
        return newUser
    }
    
    updateRestrictions = async (id, data) => {
        return await this.model.updateRestrictions(id, data);
    }
    updateUser = async (id, data) => {
        return await this.model.updateUser(id, data);
    }


    addRecetaFavorita = async (id, recetaFav) => {
        return await this.model.addRecetaFavorita(id, recetaFav);
    }
    removeRecetaFavorita = async (id, idRecetaFavorita) => {
        return await this.model.removeRecetaFavorita(id, idRecetaFavorita);
    }
}

export default UsersService;