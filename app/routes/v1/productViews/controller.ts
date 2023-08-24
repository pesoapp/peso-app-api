import service from "./service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const {
    limit = 10,
    page = 1,
    customer_id = 0,
    product_id = 0,
    p_type = 0,
  } = _req.query;

  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
    customer_id: Number(customer_id),
    product_id: Number(product_id),
    p_type: Number(p_type),
  });

  _res.send({
    data,
    status: "success",
    message: "Get Product Views success",
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
      message: "Get Product Views failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Product Views success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const data = await service.getAll({
    customer_id: Number(_req.body.customer_id),
    product_id: Number(_req.body.product_id),
    p_type: Number(_req.body.p_type),
  });

  _res.send({
    data: [
      data.length == 0
        ? await service.add(_req.body)
        : await service.update(data[0].id ?? 0, _req.body),
    ],
    status: "success",
    message: "Add Product Views success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Product Views success",
  });
};

export { getAll, getById, add, update, removeOne };
