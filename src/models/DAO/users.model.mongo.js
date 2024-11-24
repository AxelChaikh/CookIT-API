import MongoConnection from "../MongoConnection.js"
import { ObjectId } from "mongodb";

class UsersModelMongo {
    constructor() { }

    getUserById = async (id) => {
        const user = await MongoConnection.db
            .collection("users")
            .findOne({ _id: ObjectId.createFromHexString(id) });
        return await user
    }

    getAllUsers = async () => {

        try {
            const data = await MongoConnection.db.collection("users").find({}).toArray()
            return data
        } catch (err) {
            console.error("Error: ", err.message)
        }
    }
    getUserByUsername = async (name) => {
        const user = await MongoConnection.db
            .collection("users")
            .findOne({ username: name });
        return await user
    }

    getUsersByRol = async (rol) => {
        const data = await MongoConnection.db.collection("users").find({ rol: rol }).toArray()
        return data
    }

    uploadNewUser = async (user) => {
        const us = await MongoConnection.db.collection("users").insertOne(user)
        return us
    }
    deleteUserById = async (id) => {
        const user = await MongoConnection.db.collection("users").deleteOne({ _id: ObjectId.createFromHexString(id) })
        return user
    }

    updateRestrictions = async (id, data) => {
        try {
            const restrictionsOk = ["vegan", "veggie", "gluten"]
            const restrictionsIn = data?.restricciones || [];
            const dataOk = restrictionsIn.every(e => restrictionsOk.includes(e));
            let resp;
            if (dataOk) {
                resp = await MongoConnection.db.collection("users").updateOne(
                    { _id: ObjectId.createFromHexString(id) },
                    { $set: { "restricciones": data.restricciones } }
                );
            } else {
                resp = 'Restricciones inválidas';
            }
            return await resp;
        } catch (error) {
            console.log(error);
        }
    }

    updateUser = async (id, data) => {
        const user = await MongoConnection.db.collection("users").updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: data }
        );
        return user;
    };

    addRecetaFavorita = async (id, recetaFav) => {
        let res;
        let user;
        const recetaConId = {  _id: new ObjectId(), ...recetaFav }
        user = await MongoConnection.db
            .collection("users")
            .findOne({ _id: ObjectId.createFromHexString(id) });

        if (user !== null) {
            res = await MongoConnection.db
                .collection("users")
                .updateOne(
                    { _id: ObjectId.createFromHexString(id) },
                    { $addToSet: { recetasFavoritas: recetaConId } }
                );
            user = await MongoConnection.db
                .collection("users")
                .findOne({ _id: ObjectId.createFromHexString(id) });
        } else {
            return "usuario inexistente";
        }
        return { res, user };
    };

    removeRecetaFavorita = async (id, idRecetaFavorita) => {
        let res;
        let user;
        // Verifica si el usuario existe
        user = await MongoConnection.db
            .collection("users")
            .findOne({ _id: ObjectId.createFromHexString(id) });

        if (user !== null) {
            // Utiliza el operador $pull para eliminar el objeto con el _id correspondiente
            res = await MongoConnection.db
                .collection("users")
                .updateOne(
                    { _id: ObjectId.createFromHexString(id) },
                    { $set: data },
            { $pull: { recetasFavoritas: { _id: ObjectId.createFromHexString(idRecetaFavorita) } } }
        );
            if(res.matchedCount == 1 && res.modifiedCount == 0){
                return "No existe ninguna receta favorita con ese id."
            }
            // Obtener el usuario actualizado sin tener que hacer otra consulta
            user = await MongoConnection.db
                .collection("users")
                .findOne({ _id: ObjectId.createFromHexString(id) });
        } else {
            return "usuario inexistente";
        }
        return { res, user };
    };
}


export default UsersModelMongo
