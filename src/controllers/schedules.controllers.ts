import { Request, Response } from "express";

import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedules/createSchedules.service";
import listScheduleService from "../services/schedules/listSchedules.service";

const createSchedulesController = async (req: Request, res: Response) => {
  try {
    const { propertyId, date, hour }: IScheduleRequest = req.body;
    const userId = req.user.id;

    const schedule = await createScheduleService({
      userId,
      propertyId,
      date,
      hour,
    });

    return res.status(201).send(schedule);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const listSchedulesController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const schedules = await listScheduleService(id);

    return res.send(schedules);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};
export { createSchedulesController, listSchedulesController };
