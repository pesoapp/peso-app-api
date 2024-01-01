import service from "./service";
import { Request, Response } from "express";

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Oc Country failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Country success",
  });
};

export { getById };
