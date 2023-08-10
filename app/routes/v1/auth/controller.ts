import { Request, Response } from "express";
import service from "./service";
import ocCustomer from "../ocCustomer/service";
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

const google = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;
  const data = await ocCustomer.getByEmail(email);

  if (data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Google Login failed",
    });
    return;
  }

  _res.send({
    data,
    status: "success",
    message: "Google Login success",
  });
};

const facebook = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;
  const data = await ocCustomer.getByEmail(email);

  if (data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Facebook Login failed",
    });
    return;
  }

  _res.send({
    data,
    status: "success",
    message: "Facebook Login success",
  });
};

const apple = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;
  const data = await ocCustomer.getByEmail(email);

  if (data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Apple Login failed",
    });
    return;
  }

  _res.send({
    data,
    status: "success",
    message: "Apple Login success",
  });
};

export { apple, facebook, google, login };
