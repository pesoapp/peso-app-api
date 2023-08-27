import service from "./service";
import { Request, Response } from "express";
import { pTypeParser } from "../../../utils";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
  });

  _res.send({
    data,
    status: "success",
    message: "Get Oc Customer Wishlist success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  _res.send({
    data: [],
    status: "success",
    message: "Get Oc Customer Wishlist success",
  });
};

const getByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByCustomer(Number(id));

  data.map((e: any) => {
    e.p_type = pTypeParser(e.p_type);
    return e;
  });

  _res.send({
    data,
    status: "success",
    message: "Get Oc Customer Wishlist success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const temp = await service.getAll({
    limit: 1,
    page: 1,
    customer_id: _req.body.customer_id,
    product_id: _req.body.product_id,
  });

  if (temp.length != 0) {
    _res.send({
      data: [],
      status: "success",
      message: "Add Oc Customer Wishlist success",
    });
    return;
  }

  const data = await service.add({
    customer_id: _req.body.customer_id,
    product_id: _req.body.product_id,
  });
  _res.send({
    data: [data],
    status: "success",
    message: "Add Oc Customer Wishlist success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { customer_id = 0, product_id = 0 } = _req.query;

  const data = await service.removeOne({
    customer_id: Number(customer_id),
    product_id: Number(product_id),
  });

  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Customer Wishlist success",
  });
};

export { getByCustomer, getAll, getById, add, update, removeOne };
