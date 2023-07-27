import { Router, Express } from "express";

export interface IRoute {
  url: any;
  route: Router;
}

export type AddRoutes = (app: Express) => void;
