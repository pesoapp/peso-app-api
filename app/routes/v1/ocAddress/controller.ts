import service from "./service";
import ocCustomer from "../ocCustomer/service";

import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get Oc Address success",
  });
};

const getManyByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.getManyByCustomer(Number(id));
  const customer = await ocCustomer.getById(Number(id));

  data.map((e: any) => {
    e.trackingId = e.tracking_id == null ? 0 : e.tracking_id;
    e.selected = e.address_id == customer?.address_id ? true : false;
    return e;
  });

  _res.send({
    data,
    status: "success",
    message: "Get Oc Address success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Address success",
  });
};

const add = async (_req: Request, _res: Response) => {
  const { customer_id, ...res } = _req.body;
  const customer = await ocCustomer.getById(Number(customer_id));

  if (!customer) {
    _res.send({
      data: [],
      status: "fail",
      message: "Create Oc Address failed",
    });
    return;
  }

  const data = await service.add({
    customer_id,
    firstname: customer.firstname,
    lastname: customer.lastname,
    ...res,
  });

  await ocCustomer.setAddress(Number(customer_id), Number(data.address_id));

  _res.send({
    data,
    status: "success",
    message: "Get Oc Address success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { getManyByCustomer, getById, getAll, add, update, removeOne };
