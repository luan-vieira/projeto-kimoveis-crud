import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Properties } from "../../entities/properties.entity";
import {
  IPropertyRequest,
  IAddress,
  IProperty,
} from "../../interfaces/properties";

import { Categories } from "../../entities/category.entity";

const createPropertieService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propRepo = AppDataSource.getRepository(Properties);
  const categoryRepo = AppDataSource.getRepository(Categories);
  const addressRepo = AppDataSource.getRepository(Addresses);

  let d: Date = new Date();
  const date: string = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  const adresses = await addressRepo.find();

  const categories = await categoryRepo.find();

  const category = categories.find((e) => e.id === categoryId);

  if (!category) {
    throw new Error("Category not exists");
  }

  const addressAlreadyExists = adresses.find(
    (e) => e.district === address.district
  );

  if (addressAlreadyExists) {
    throw new Error("This address already registred!");
  }

  const properties = await propRepo.find();

  const property = properties.find((e) => e.value === value && e.size === size);

  if (property) {
    throw new Error("This propertie already exists");
  }

  const newAddress: IAddress = addressRepo.create({
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressRepo.save(newAddress);

  const newProperty = propRepo.create({
    sold: false,
    value,
    size,
    createdAt: date,
    updatedAt: date,
    address: newAddress,
    category: category,
  });

  await propRepo.save(newProperty);

  return newProperty;
};

export default createPropertieService;
