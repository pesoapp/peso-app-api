import service from "./service";

import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get Oc Delivery Charge success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Deliver Charge success",
  });
};

const add = async (_req: Request, _res: Response) => {};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { getById, getAll, add, update, removeOne };
