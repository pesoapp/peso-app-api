import service from "./service";
import { Request, Response } from "express";

const getAllByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getAllByCustomer(Number(id));

  const temp = data.map((e: any) => {
    const { id, ...res } = e;
    return { id: Number(id), ...res };
  });

  _res.send({
    data: temp,
    status: "success",
    message: "Get Conversation success",
  });
};

export { getAllByCustomer };
