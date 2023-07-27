import { AddRoutes, IRoute } from "../interfaces/index.js";
import { Express } from "express";

import V1 from "./v1/index.js";

export const routes: IRoute[] = [
  {
    url: "/api/v1/oc-delivery-charge",
    route: V1.ocDeliveryChargeRoute,
  },
  {
    url: "/api/v1/auction",
    route: V1.auctionRoute,
  },
  {
    url: "/api/v1/auth",
    route: V1.authRoute,
  },
  {
    url: "/api/v1/condition",
    route: V1.conditionRoute,
  },
  {
    url: "/api/v1/oc-customer",
    route: V1.ocCustomerRoute,
  },
  {
    url: "/api/v1/oc-product-brand",
    route: V1.ocProductBrandRoute,
  },
  {
    url: "/api/v1/auction-side-images",
    route: V1.auctionSideImagesRoute,
  },
  {
    url: "/api/v1/oc-address",
    route: V1.ocAddressRoute,
  },
  {
    url: "/api/v1/auction-question",
    route: V1.auctionQuestionRoute,
  },
];

export const addRoutes: AddRoutes = (app: Express) => {
  routes.forEach((route) => {
    app.use(route.url, route.route);
  });
};
