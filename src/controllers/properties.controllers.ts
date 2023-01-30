import { Request, Response } from "express";

import { IPropertyRequest } from "../interfaces/properties";
import createPropertieService from "../services/properties/createPropertie.service";
import getPropertiesService from "../services/properties/getProperties.service";

const createPropertieController = async (req: Request, res: Response) => {
  try {
    const { value, size, address, categoryId }: IPropertyRequest = req.body;

    const prop = await createPropertieService({
      value,
      size,
      address,
      categoryId,
    });

    return res.status(201).send(prop);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const listPropertiesController = async (req: Request, res: Response) => {
  try {
    const properties = await getPropertiesService();

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

export { listPropertiesController, createPropertieController };
