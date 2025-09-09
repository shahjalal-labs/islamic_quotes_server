import { Router } from "express";
import verifyJWT from "../../middlewares/verifyJWT.js";
import { QuotesControllers } from "./quotes.controller.js";

const router = Router();

// router.get("/recipes", verifyJWT, RecipeControllers.getRecipes);
router.get("/recipes", QuotesControllers.getRecipes);

router.get("/recipe/:id", QuotesControllers.getSingleRecipe);
router.patch("/recipe/:id", QuotesControllers.updateRecipe);
router.delete("/recipe/:id", QuotesControllers.deleteaRecipe);
router.post("/recipes", QuotesControllers.createMultipleRecipe);
router.post("/create-recipe", QuotesControllers.createRecipe);

export const quotesRoutes = router;
