import { Request, Response } from "express";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
import { instanceToPlain } from "class-transformer";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import { User } from "../entities/user.entity";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm }: IUserRequest = req.body;

    const user = await createUserService({ name, email, password, isAdm });

    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

const listUserController = async (req: Request, res: Response) => {
  try {
    const users = await listUsersService();

    return res.send(instanceToPlain(users));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserUpdate = req.body;
    const id: string = req.params.id;
    const updatedUser = await updateUserService(user, id);
    if (updatedUser instanceof User) {
      return res.json(updatedUser);
    }
    return res.status(updatedUser[1] as number).json({
      message: updatedUser[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDeleted = await deleteUserService(id);
    return res.status(204).json({ message: "User deleted !" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export {
  createUserController,
  listUserController,
  updateUserController,
  deleteUserController,
};
