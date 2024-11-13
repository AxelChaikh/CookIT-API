import Factory from "../models/DAO/Factory.js"
import config from "../config.js"

class RecipesService {
    constructor() {
        this.model = Factory.get(config.PERSISTENCE).recipes
    }

    getAllRecipes = async() => {
        const allRecipes = await this.model.getAllRecipes()
        return allRecipes
    }

    getRecipesById = async(id) => {
        return await this.model.getRecipesById(id)
    }

    
}

export default RecipesService;