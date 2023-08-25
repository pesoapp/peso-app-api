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
    message: "Get Oc Banner Image Description success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  _res.send({
    data: [],
    status: "success",
    message: "Get Oc Banner Image Description success",
  });
};

const getByBanner = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByBanner(Number(id));

  _res.send({
    data,
    status: "success",
    message: "Get Oc Banner Image success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Banner Image Description success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Banner Image Description success",
  });
};

export { getByBanner, getAll, getById, add, update, removeOne };
