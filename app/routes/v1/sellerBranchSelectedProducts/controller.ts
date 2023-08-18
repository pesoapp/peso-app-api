import service from "./service";
import { Request, Response } from "express";

// TODO: Add status query
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
  });
  _res.send({
    data,
    status: "success",
    message: "Get Seller Branch Selected Products success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Seller Branch Selected Products failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Seller Branch Selected Products success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Seller Branch Selected Products success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Seller Branch Selected Products success",
  });
};

export { getAll, getById, add, update, removeOne };
