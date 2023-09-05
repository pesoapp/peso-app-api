import service from "./service";
import { Request, Response } from "express";
import auction from "../auction/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction Cart success",
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
      message: "Get Auction Cart failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Auction Cart success",
  });
};

const getByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByCustomer(Number(id));
  const auctionTemp = await auction.getManyById(
    data.map((e: any) => {
      return e.auction_id;
    })
  );

  data.map((e: any) => {
    e.auction = auctionTemp.find((auc: any) => auc.id == e.auction_id);
    return e;
  });

  _res.send({
    data,
    status: "success",
    message: "Get Auction Cart success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  //TODO: Update only if auction cart already exissts
  const data = await service.add(_req.body);

  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Cart success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const updateQuantity = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.updateQuantity(Number(id), _req.body);

  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Cart success",
  });
};
const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Auction Cart success",
  });
};

export {
  updateQuantity,
  getByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
};
