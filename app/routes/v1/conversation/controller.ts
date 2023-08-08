import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();

  const temp = data.map((e: any) => {
    const { id, ...res } = e;
    return { id: Number(id), ...res };
  });

  _res.send({
    data: temp,
    status: "success",
    message: "Get Conversation success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
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
