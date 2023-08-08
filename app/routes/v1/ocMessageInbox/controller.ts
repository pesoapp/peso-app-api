import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get Oc Message Inbox success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Message Inbox success",
  });
};

const add = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Message Inbox success",
  });
};

const update = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Update Oc Message Inbox success",
  });
};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Update Oc Message Inbox success",
  });
};

export { getById, getAll, add, update, removeOne };
