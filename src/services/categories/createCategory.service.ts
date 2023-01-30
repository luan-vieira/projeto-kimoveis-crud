import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";

import { ICategory, ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<ICategoryRequest> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.find();

  const category = categories.find((category) => category.name === name);

  if (!name) {
    throw new Error("Name required");
  }

  if (category) {
    throw new Error("Category already exists");
  }

  const newCategory: ICategory = categoriesRepository.create({
    name,
  });

  categoriesRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
