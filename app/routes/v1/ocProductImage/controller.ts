import service from "./service";
import { Request, Response } from "express";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Product Image failed",
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
      message: "Get Oc Product Image success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Product Image failed",
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
    status: "fail",
    message: "Get Oc Product Image success",
  });
};

const getByProduct = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByProduct(Number(id));

  _res.send({
    data,
    status: "fail",
    message: "Get Oc Product Image success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Product Image success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Product Image success",
  });
};

export { getByProduct, getAll, getById, add, update, removeOne };
