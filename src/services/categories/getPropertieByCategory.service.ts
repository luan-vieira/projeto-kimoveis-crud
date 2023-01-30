import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";

import { IIdCategory, ICategoryRequest } from "../../interfaces/categories";

const getPropertiesByCategoryService = async ({ id }: IIdCategory) => {
  const categoryRepo = AppDataSource.getRepository(Categories);

  const categories = await categoryRepo.find();

  const category = categories.find((e) => e.id === id);

  if (!category) {
    throw new Error("Invalid Id");
  }

  return category.properties;
};

export default getPropertiesByCategoryService;
