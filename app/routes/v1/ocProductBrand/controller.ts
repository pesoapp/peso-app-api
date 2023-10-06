import service from "./service";

import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Product Brand failed",
  };

  try {
    const data = await service.getAll(_req.query);
    response = {
      data: data,
      status: "success",
      message: "Get Oc Product Brand success",
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Product Brand failed",
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
    message: "Get Oc Product Brand success",
  });
};

const add = async (_req: Request, _res: Response) => {
  const data = await service.add(_req.body);
  _res.send({
    data: [data],
    status: "success",
    message: "Add Oc Product Brand success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { getById, getAll, add, update, removeOne };
