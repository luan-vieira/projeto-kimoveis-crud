import { Router } from "express";
import {
  createCategoryController,
  getPropertiesByCategoryController,
  listCategoriesController,
} from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);
categoriesRoutes.get("/", listCategoriesController);
categoriesRoutes.get("/:id/properties", getPropertiesByCategoryController);

export default categoriesRoutes;
