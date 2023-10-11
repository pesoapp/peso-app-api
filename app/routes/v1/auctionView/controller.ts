import service from "./service";
import { Request, Response } from "express";

const getByAuction = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.getByAuction(Number(id));
    response = {
      data,
      status: "success",
      message: "Get Auction View success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

export { getByAuction };
