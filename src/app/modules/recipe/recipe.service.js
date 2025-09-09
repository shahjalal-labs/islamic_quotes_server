import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js";

const getRecipeCollection = () => {
  const recipeCollection = getDB().collection("recipes");

  return recipeCollection;
};
const createRecipeIntoDB = async (coffee) => {
  const recipeCollection = getRecipeCollection();

  const response = await recipeCollection.insertOne(coffee);
  return response;
};

const createMultipleRecipeIntoDB = async (coffees) => {
  const recipeCollection = getRecipeCollection();
  const response = await recipeCollection.insertMany(coffees);
  return response;
};

const getRecipesFromDB = async (query) => {
  const limit = query.limit || 0;
  const email = query.email;
  const recipeCollection = await getRecipeCollection();
  let response;
  if (email) {
    response = await recipeCollection
      .find({ userEmail: email })
      .sort({ likeCount: -1 })
      .limit(limit)
      .toArray();
    return response;
  }
  response = await recipeCollection
    .find()
    .sort({ likeCount: -1 })
    .limit(limit)
    .toArray();
  return response;
};

const getSingleRecipeFromDB = async (id) => {
  const recipeCollection = await getRecipeCollection();
  const response = await recipeCollection.findOne({ _id: new ObjectId(id) });

  return response;
};

const deleteRecipeFromDB = async (id) => {
  const recipeCollection = await getRecipeCollection();
  const response = await recipeCollection.deleteOne({ _id: new ObjectId(id) });
  return response;
};

const updateRecipeInDB = async (id, coffee) => {
  const recipeCollection = await getRecipeCollection();

  const filter = {
    _id: new ObjectId(id),
  };

  const updateDoc = {
    $set: coffee,
  };
  const options = {
    upsert: false,
  };
  const response = await recipeCollection.updateOne(filter, updateDoc, options);
  return response;
};

export const RecipeServices = {
  createRecipeIntoDB,
  getRecipesFromDB,
  getSingleRecipeFromDB,
  deleteRecipeFromDB,
  updateRecipeInDB,
  createMultipleRecipeIntoDB,
};
