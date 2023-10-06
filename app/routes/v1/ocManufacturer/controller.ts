import service from "./service";
import { Request, Response } from "express";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Manufacturer failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({});
    response = {
      data: data,
      status: "success",
      message: "Get Oc Manufacturer success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Manufacturer failed",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  _res.send(response);
};

const getById = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "fail",
    message: "Get Oc Manufacturer success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Manufacturer success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Manufacturer success",
  });
};

export { getAll, getById, add, update, removeOne };
