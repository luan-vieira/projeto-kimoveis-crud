import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import getPropertiesByCategoryService from "../services/categories/getPropertieByCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newCategory = await createCategoryService({ name });

    return res.status(201).send(newCategory);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const getPropertiesByCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const properties = await getPropertiesByCategoryService({ id });

    return res.send(properties);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const listCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await listCategoriesService();

    return res.send(categories);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export {
  getPropertiesByCategoryController,
  createCategoryController,
  listCategoriesController,
};
