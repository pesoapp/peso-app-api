import { Request, Response } from "express";
import service from "./service";
import { parseCredential } from "../../../utils";

const login = async (_req: Request<any, any, any>, _res: Response) => {
  const { credential = "", password = "" } = _req.body;
  const data = await service.login(parseCredential(credential), password);

  if (data.length == 0) {
    _res.send({
      data: [],
      status: "fail",
      message: "Login failed",
    });
    return;
  }

  _res.send({
    data,
    status: "success",
    message: "Login success",
  });
};

export { login };
