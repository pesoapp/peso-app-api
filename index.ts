require("dotenv").config();
import ENV from "./app/env";
import { addRoutes } from "./app/routes";
import { addMiddlewares } from "./app/middlewares";

import express, { Request, Response, Express } from "express";

const app: Express = express();

addMiddlewares(app);
addRoutes(app);

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Build CRUD API with Node.js and Sequelize",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  });
});

const start = () => {
  app.listen(ENV.PORT, async () => {
    console.log("🚀 Server started Successfully");
  });
};

start();
