import service from "./service";
import { Request, Response } from "express";
import loungeGroup from "../loungeGroup/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Lounge Group Member failed",
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
      message: "Get Lounge Group Member success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Lounge Group Member failed",
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
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Lounge Group Member failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Lounge Group Member success",
  });
};

const getByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getByCustomer(Number(id));

  const tempLoungeGroup = await loungeGroup.getManyByLoungeGroup(
    data.map((e: any) => e.lounge_group_id)
  );

  await Promise.all(
    tempLoungeGroup.map(async (e: any) => {
      e.members = await service.getByLoungeGroup(Number(e.id));
      return e;
    })
  );

  _res.send({
    data: tempLoungeGroup,
    status: "success",
    message: "Get Lounge Group Member success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const data = await service.add(_req.body);

  _res.send({
    data: [data],
    status: "success",
    message: "Add Lounge Group Member success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Group Member success",
  });
};

const removeCustomer = async (_req: Request, _res: Response) => {
  const { id = 0, customer_id = 0 } = _req.params;
  const data = await service.removeCustomer({
    lounge_group_id: Number(id),
    customer_id: Number(customer_id),
  });

  if (data.count <= 0) {
    _res.send({
      data: [],
      status: "fail",
      message: "Remove Lounge Group Member failed",
    });
    return;
  }

  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Group Member success",
  });
};

export {
  getByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
  removeCustomer,
};
