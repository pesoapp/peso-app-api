import { Request, Response } from "express";
import service from "./service";
import ocCustomer from "../ocCustomer/service";
import { parseCredential } from "../../../utils";
const login = async (_req: Request<any, any, any>, _res: Response) => {
  const { credential = "", password = "" } = _req.body;

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.login(parseCredential(credential), password);

    if (data.length == 0) {
      throw new Error();
    }

    response = {
      data,
      status: "success",
      message: "Login success",
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

const google = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await ocCustomer.getByEmail(email);

    if (data) {
      throw new Error();
    }
    response = {
      data,
      status: "success",
      message: "Google Login success",
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

const facebook = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await ocCustomer.getByEmail(email);

    if (data) {
      throw new Error();
    }
    response = {
      data,
      status: "success",
      message: "Facebook Login success",
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

const apple = async (_req: Request<any, any, any>, _res: Response) => {
  const { email = "" } = _req.body;
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await ocCustomer.getByEmail(email);

    if (data) {
      throw new Error();
    }
    response = {
      data,
      status: "success",
      message: "Apple Login success",
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

export { apple, facebook, google, login };
