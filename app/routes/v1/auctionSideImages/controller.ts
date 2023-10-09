import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 5, page = 1 } = _req.query;

  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction Side Images failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({ limit, page });
    response = {
      data: data,
      status: "success",
      message: "Get Auction Side Images success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
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

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.getById(Number(id));
    response = {
      data: [data],
      status: "success",
      message: "Get Auction Side Images success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const add = async (_req: Request, _res: Response) => {
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.add(_req.body);
    response = {
      data: [data],
      status: "success",
      message: "Add Auction success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { getAll, getById, add, update, removeOne };
