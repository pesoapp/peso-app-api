import service from "./service";
import { Request, Response } from "express";

const getManyByPost = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const data = await service.getManyByPost(Number(id ?? 0));

  _res.send({
    data,
    status: "success",
    message: "Get Lounge Post Views success",
  });
};

export { getManyByPost };
