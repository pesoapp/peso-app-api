import { Request, Response } from "express";
import { searchYoutube } from "../../../utils";

const getAll = async (_req: Request, _res: Response) => {
  const { query = "peso app" } = _req.query;

  const data = await searchYoutube(query.toString(), 10);
  _res.send({
    data,
    status: "success",
    message: "Get Youtube Video Success success",
  });
};

export { getAll };
