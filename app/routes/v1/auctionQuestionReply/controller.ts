import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 5, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction Question Reply success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Auction Question Reply success",
  });
};

const getByAuctionQuestion = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByAuctionQuestion(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Auction Question Reply success",
  });
};

const add = async (_req: Request, _res: Response) => {
  const data = await service.add(_req.body);
  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Question Reply success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { getByAuctionQuestion, getAll, getById, add, update, removeOne };
