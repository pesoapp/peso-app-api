import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 5, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction Bid success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Auction Bid success",
  });
};

const getByAuction = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByAuction(Number(id));

  const temp =
    (await ocCustomer.getManyByCustomer(data.map((e: any) => e.customer_id))) ??
    [];

  data.map((e: any) => {
    e.customer = temp.find(
      (customer: any) => (customer.customer_id = e.customer_id)
    );
    return e;
  });

  _res.send({
    data,
    status: "success",
    message: "Get Auction Bid success",
  });
};

const add = async (_req: Request, _res: Response) => {
  const data = await service.add(_req.body);
  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Bid success",
  });
};

const approve = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.approve(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Approve Auction Bid success",
  });
};
const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { approve, getByAuction, getAll, getById, add, update, removeOne };
