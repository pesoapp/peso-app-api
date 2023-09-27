import service from "./service";
import { Request, Response } from "express";

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

export { add, removeOne };
