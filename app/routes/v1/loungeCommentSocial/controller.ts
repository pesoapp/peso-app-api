import service from "./service";
import { Request, Response } from "express";

const toggleLike = async (_req: Request<any, any, any>, _res: Response) => {
  const { customer_id, comment_id } = _req.body;
  const temp = await service.getOne({
    customer_id: Number(customer_id),
    comment_id: Number(comment_id),
  });

  if (temp.length > 0) {
    await service.removeOne({ customer_id, comment_id });
    _res.send({
      data: [],
      status: "success",
      message: "Unlike Lounge Comment Social success",
    });
    return;
  }
  const data = await service.add({
    customer_id: Number(customer_id),
    comment_id: Number(comment_id),
  });

  _res.send({
    data: [data],
    status: "success",
    message: "Toggle Like Lounge Comment Social success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const data = await service.add(_req.body);
  _res.send({
    data: [data],
    status: "success",
    message: "Add Lounge Comment Social success",
  });
};

const removeOne = async (_req: Request, _res: Response) => {
  const { customer_id, comment_id } = _req.params;
  const data = await service.removeOne({ customer_id, comment_id });

  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Comment Social success",
  });
};

export { toggleLike, add, removeOne };
