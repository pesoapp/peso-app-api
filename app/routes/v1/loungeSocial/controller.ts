import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Lounge Social success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getAllLikesByPost = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getAllLikesByPost(Number(id));
  _res.send({
    data,
    status: "success",
    message: "Get Lounge Social success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Get Lounge Social success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Lounge Social success",
  });
};

const toggleLike = async (_req: Request<any, any, any>, _res: Response) => {
  const data = await service.toggleLike(_req.body);

  _res.send({
    data,
    status: "success",
    message: "Add Lounge Social success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Social success",
  });
};

export {
  toggleLike,
  getAllLikesByPost,
  getAll,
  getById,
  add,
  update,
  removeOne,
};
