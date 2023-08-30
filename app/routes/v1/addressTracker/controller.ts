import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1, province = "", city = "" } = _req.query;
  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
    province: province.toString(),
    city: city.toString(),
  });

  _res.send({
    data,
    status: "success",
    message: "Get Address Tracker success",
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
    message: "Get Address Tracker success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { getAll, getById, add, update, removeOne };
