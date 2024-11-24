import MongoConnection from "../MongoConnection.js"
import { ObjectId } from "mongodb"

class RecipesModelMongo {
  constructor() { }

  getAllRecipes = async () => {
    const allRecipes = await MongoConnection.db.collection("recipes").find({}).toArray()
    return allRecipes
  };

  getRecipesById = async (id) => {
      let resp;
      if(id !== undefined){
        resp = await MongoConnection.db
        .collection("recipes")
        .findOne({ _id: ObjectId.createFromHexString(id) });

        if (resp.matchedCount === 0) {
          resp = 'El ID es incorrecto';
        }
      } else {
        resp = 'ID invalido'
      }
      return resp
  }

  getRecipesByRestriction = async (apto) => {
    const recipesByDifficulty = await MongoConnection.db.collection("recipes").find({ apto: apto }).toArray()
    return recipesByDifficulty
  }

  getRecipesByIngredient = async (ingredient) => {
    const allRecipes = await MongoConnection.db.collection("recipes").find({}).toArray()
    let RecipesByIngredient = []
    allRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing =>{
        if(ing.toLowerCase().includes(ingredient.toLowerCase())){
          RecipesByIngredient.push(recipe)
        }
      })
    })

      return RecipesByIngredient

  }

  getRecipesByDifficulty = async (difficulty) => {
    const recipesByRestriction = await MongoConnection.db.collection("recipes").find({ difficulty: RegExp(`^${difficulty}$`, 'i') }).toArray()
    return recipesByRestriction
  }

  deleteRecipeById = async (id) => {
    const recipeDeleted = await MongoConnection.db.collection("recipes").deleteOne({ _id: ObjectId.createFromHexString(id) })
    return recipeDeleted
  }

  updateRecipe = async (id, data) => {
    const recipe = await MongoConnection.db.collection("recipes").updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data }
    );
    return recipe;
  };

  updateTags = async (id, data) => {
    try {
      let resp;
      if (data.tags !== undefined) {
        resp = await MongoConnection.db.collection("recipes").updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: { "tags": data.tags } }
        );
        if (resp.matchedCount === 0) {
          resp = 'El ID es incorrecto';
        }
      } else {
        resp = 'Tags inválidos';
      }
      return await resp;
    } catch (error) {
      console.error(error);
    }
  }

  uploadNewRecipe = async (recipe) => {
    const rec = await MongoConnection.db.collection("recipes").insertOne(recipe)
    return rec
  }

}

export default RecipesModelMongo;

