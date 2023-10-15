require("dotenv").config();
import "express-async-errors";
import ENV from "./app/env";
import { addRoutes } from "./app/routes";
import { addMiddlewares } from "./app/middlewares";
import express, { Request, Response, Express } from "express";
import fs from "fs";
const app: Express = express();

addMiddlewares(app);
addRoutes(app);

app.use(function (err: any, req: any, res: any, next: any) {
  res.status(403);
  res.json({
    data: [],
    status: "fail",
    message: "Something wrong with the server",
  });
});

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
  fs.mkdirSync("./uploads", { recursive: true });
  app.listen(ENV.PORT, async () => {
    console.log("🚀 Server started Successfully");
  });
};

start();
