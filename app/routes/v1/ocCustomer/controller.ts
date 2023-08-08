import service from "./service";

import { Request, Response } from "express";
import { PUSHER_INSTANCE } from "../../../utils";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get Oc Customer success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Customer success",
  });
};

const toggleActiveStatus = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const { status = false } = _req.body;
  const data = await service.toggleActiveStatus(Number(id), status);

  await PUSHER_INSTANCE.triggerBatch([
    {
      channel: "auctioner_active",
      name: "live-demo-status",
      data: { status, customer_id: id },
    },
  ]);

  _res.send({
    data: [data],
    status: "success",
    message: "Toggle Status success",
  });
};
const add = async (_req: Request, _res: Response) => {};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {};

export { toggleActiveStatus, getById, getAll, add, update, removeOne };
