import { Router } from "express";
import {
  listPropertiesController,
  createPropertieController,
} from "../controllers/properties.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertieController
);
propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
