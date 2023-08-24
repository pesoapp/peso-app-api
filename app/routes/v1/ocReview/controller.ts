import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;

  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
  });

  _res.send({
    data,
    status: "success",
    message: "Get Oc Review success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.getById(Number(id));

  _res.send({
    data: [data],
    status: "fail",
    message: "Get Oc Review success",
  });
};

const getByProduct = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const { limit = 10, page = 1 } = _req.query;

  const data = await service.getByProduct({
    limit: Number(limit),
    page: Number(page),
    product_id: Number(id),
  });

  _res.send({
    data,
    status: "success",
    message: "Get Oc Review success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Review success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Review success",
  });
};

export { getByProduct, getAll, getById, add, update, removeOne };
