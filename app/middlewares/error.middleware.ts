import { Request, Response, NextFunction } from "express";

const middleware = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (_res.headersSent) {
    return next(err);
  }
  console.log(1);

  _res.send({
    data: [],
    status: "fail",
    message: "There seems to be a problem with the server",
  });
};

export default middleware;
