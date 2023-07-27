import service from "./service";
import { Request, Response } from "express";
import ocCustomerWallet from "../ocCustomerWallet/service";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 5, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction Question success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  _res.send({
    data: [data],
    status: "success",
    message: "Get Auction Question success",
  });
};

const getByAuction = async (_req: Request, _res: Response) => {
  const { id = 5 } = _req.params;
  const data = await service.getByAuction(Number(id));
  _res.send({
    data,
    status: "success",
    message: "Get Auction Question success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const { auction_id, customer_id } = _req.body;
  const questions = await service.getByAuction(Number(auction_id));

  await ocCustomerWallet.add({
    customer_id,
    particulars: "Ask the Auction",
    amount: questions.length == 0 ? 2 : 0.1,
  });

  const data = await service.add(_req.body);
  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Question success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Auction Question success",
  });
};

export { getByAuction, getAll, getById, add, update, removeOne };
