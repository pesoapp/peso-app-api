import service from "./service";
import ocCustomer from "../ocCustomer/service";
import ocAddress from "../ocAddress/service";
import auctionCart from "../auctionCart/service";
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
    message: "Get Auction Order success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Auction Order failed",
    });
    return;
  }

  _res.send({
    data: [],
    status: "success",
    message: "Get Auction Order success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const { customer_id } = _req.body;
  const customer = await ocCustomer.getById(Number(_req.body.customer_id));
  const b_address = await ocAddress.getById(Number(_req.body.b_address));
  const d_address = await ocAddress.getById(Number(_req.body.d_address));
  _res.send({
    data: [],
    status: "success",
    message: "Add Auction Order success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Auction Order success",
  });
};

export { getAll, getById, add, update, removeOne };
