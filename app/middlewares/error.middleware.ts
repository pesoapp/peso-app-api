import { Request, Response, NextFunction } from "express";

const middleware = (_req: Request, _res: Response, next: NextFunction) => {
  try {
    next();
  } catch (_: any) {
    console.log("test");

    _res.send({
      data: [],
      status: "failed",
      message: _.toString(),
    });
    return;
  }
};

export default middleware;
