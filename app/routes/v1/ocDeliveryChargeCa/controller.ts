import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Message Inbox Ca failed",
  };

  try {
    const data = await service.getAll();
    response = {
      data: data,
      status: "success",
      message: "Get Oc Message Inbox Ca success",
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Message Inbox Ca failed",
    };
  }

  _res.send(response);
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Message Inbox Ca success",
  });
};

const add = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Message Inbox Ca success",
  });
};

const update = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Update Oc Message Inbox Ca success",
  });
};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Update Oc Message Inbox Ca success",
  });
};

export { getById, getAll, add, update, removeOne };
