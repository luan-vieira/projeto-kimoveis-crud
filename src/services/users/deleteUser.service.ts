import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({ id });

  if (!account?.isActive) {
    throw new Error("Unable to delete inactive user");
  }

  account.isActive = false;
  await userRepository.save(account);

  return true;
};
export default deleteUserService;
