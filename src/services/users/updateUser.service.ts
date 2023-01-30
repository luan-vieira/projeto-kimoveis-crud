import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";

import AppDataSource from "../../data-source";
import { hash } from "bcrypt";

const updateUserService = async (
  { name, email, password }: IUserUpdate,
  id: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    return ["User not found", 404];
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};

export default updateUserService;
