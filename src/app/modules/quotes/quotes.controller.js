import sendResponose from "../../../utils/sendResponose.js";

import { RecipeServices } from "./quotes.service.js";

const createRecipe = async (req, res, next) => {
  const coffee = req.body;
  try {
    const response = await RecipeServices.createRecipeIntoDB(coffee);
    sendResponose(res, {
      success: true,
      message: "Recipe created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const createMultipleRecipe = async (req, res, next) => {
  const coffees = req.body;
  try {
    const response = await RecipeServices.createMultipleRecipeIntoDB(coffees);
    sendResponose(res, {
      success: true,
      message: "Recipes created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const email = req.query.email;

    const limit = Number(req.query.limit) || 0;
    const likeCount = req.query.likeCount;
    const response = await RecipeServices.getRecipesFromDB({
      email,
      likeCount,
      limit,
    });
    sendResponose(res, {
      success: true,
      message: "All coffees fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await RecipeServices.getSingleRecipeFromDB(id);
    sendResponose(res, {
      success: true,
      message: "Single coffee fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coffee = req.body;
    const response = await RecipeServices.updateRecipeInDB(id, coffee);
    sendResponose(res, {
      success: true,
      message: "Recipe updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteaRecipe = async (req, res, next) => {
  try {
    const result = await RecipeServices.deleteRecipeFromDB(req.params.id);
    sendResponose(res, {
      success: true,
      message: "Recipe deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const RecipeControllers = {
  createRecipe,
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  createMultipleRecipe,
  deleteaRecipe,
};
