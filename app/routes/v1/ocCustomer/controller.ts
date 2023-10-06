import service from "./service";

import { Request, Response } from "express";
import { PUSHER_INSTANCE } from "../../../utils";
import { PUSHER } from "../../../constants";

const getAll = async (_req: Request, _res: Response) => {
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Customer failed",
  };

  try {
    const data = await service.getAll();
    response = {
      data: data,
      status: "success",
      message: "Get Oc Customer success",
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Customer failed",
    };
  }

  _res.send(response);
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
      channel: PUSHER.CHANNEL.AUCTIONER_ACTIVE,
      name: PUSHER.NAME.LIVE_DEMO_STATUS,
      data: { status, customer_id: Number(id) },
    },
  ]);

  _res.send({
    data: [data],
    status: "success",
    message: "Toggle Status success",
  });
};
const add = async (_req: Request, _res: Response) => {};

// TODO: Add peso code verification M360Api
const update = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.update({ id: Number(id) }, _req.body);

  _res.send({
    data: [data],
    status: "success",
    message: "Update Oc Customer success",
  });
};
const setAddress = async (_req: Request, _res: Response) => {
  const { address_id } = _req.body;
  const { id } = _req.params;

  const data = await service.setAddress(Number(id), Number(address_id));

  _res.send({
    data: [data],
    status: "success",
    message: "Update Oc Customer Address success",
  });
};

const removeOne = async (_req: Request, _res: Response) => {};

export { toggleActiveStatus, getById, setAddress };
