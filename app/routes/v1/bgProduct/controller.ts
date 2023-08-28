import service from "./service";

import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({});

  _res.send({
    data,
    status: "success",
    message: "Get Bg Product success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getManyByProduct = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getManyByProduct(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Bg Product failed",
    });
    return;
  }

  _res.send({
    data,
    status: "success",
    message: "Get Bg Product success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Bg Product failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Bg Product success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Bg Product success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Bg Product success",
  });
};

export { getManyByProduct, getAll, getById, add, update, removeOne };
