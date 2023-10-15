import bodyParser from "body-parser";
import cors from "cors";

import { Express } from "express";
import { AddMiddlewaress } from "../interfaces";

export const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(),
];

export const addMiddlewares: AddMiddlewaress = (app: Express) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
