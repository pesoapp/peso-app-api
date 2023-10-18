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

const add = async (_req: Request, _res: Response) => {
  const { post_id, customer_id } = _req.body;
  const data = await service.getOne(
    Number(post_id ?? 0),
    Number(customer_id ?? 0)
  );

  if (data.length !== 0) {
    await service.update(Number(post_id ?? 0), Number(customer_id ?? 0));
  } else {
    await service.add(Number(post_id ?? 0), Number(customer_id ?? 0));
  }

  _res.send({
    data,
    status: "success",
    message: "Get Lounge Post Views success",
  });
};

export { getManyByPost, add };
