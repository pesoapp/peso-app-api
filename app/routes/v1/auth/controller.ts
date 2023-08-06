import { pesoAppPost } from "../../../utils";

import { Request, Response } from "express";

const login = async (_req: Request<any, any, any>, _res: Response) => {
  const { username = "", password = "" } = _req.body;

  let formData = new FormData();
  formData.set("username", username);
  formData.set("password", password);
  const response = await pesoAppPost("auth.php?action=login", formData);

  _res.send({
    data: [{ ...response }],
    status: "success",
    message: "Login success",
  });
};

export { login };
