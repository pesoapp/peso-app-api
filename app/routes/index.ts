import { IRoute } from "../interfaces/index.js";
import { Express } from "express";

import V1 from "./v1/index.js";

export const routes: IRoute[] = [
  {
    url: "/api/v1/oc-delivery-charge",
    route: V1.ocDeliveryChargeRoute,
  },
];

export const addRoutes = (app: Express) => {
  routes.forEach((route) => {
    app.use(route.url, route.route);
  });
};
