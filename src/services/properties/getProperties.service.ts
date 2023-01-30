import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const getPropertiesService = async () => {
  const propRepository = AppDataSource.getRepository(Properties);

  const properties = await propRepository.find();

  return properties;
};
export default getPropertiesService;
