import { Router } from "express";
import { RecipeControllers } from "./recipe.controller.js";
import verifyJWT from "../../middlewares/verifyJWT.js";

const router = Router();

// router.get("/recipes", verifyJWT, RecipeControllers.getRecipes);
router.get("/recipes", RecipeControllers.getRecipes);

router.get("/recipe/:id", RecipeControllers.getSingleRecipe);
router.patch("/recipe/:id", RecipeControllers.updateRecipe);
router.delete("/recipe/:id", RecipeControllers.deleteaRecipe);
router.post("/recipes", RecipeControllers.createMultipleRecipe);
router.post("/create-recipe", RecipeControllers.createRecipe);

export const recipeRoutes = router;
