import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get Auctioner Message success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Auctioner Message success",
  });
};

const add = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Auctioner Message success",
  });
};

const update = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Update Auctioner Message success",
  });
};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Update Auctioner Message success",
  });
};

export { getById, getAll, add, update, removeOne };
