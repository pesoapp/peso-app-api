import service from "./service";

import { Request, Response } from "express";

const login = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;

  const data = await service.login(email);
  _res.send({
    data: [data],
    status: "success",
    message: "Login success",
  });
};

export { login };
