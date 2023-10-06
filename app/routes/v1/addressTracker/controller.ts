import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1, province = "", city = "" } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Address Tracker failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({
      limit: Number(limit),
      page: Number(page),
      province: province.toString(),
      city: city.toString(),
    });

    response = {
      data: data,
      status: "success",
      message: "Get Address Tracker success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Address Tracker failed",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  _res.send(response);
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
