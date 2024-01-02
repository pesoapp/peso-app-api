import { Router, Express } from "express";

export interface IRoute {
  url: any;
  route: Router;
}

export type AddRoutes = (app: Express) => void;
export type AddMiddlewaress = (app: Express) => void;
export interface IShippingRate {
  name: string;
  code: string;
  total: number;
  value: string;
  disable: boolean;
}

export interface IPaymentMethod {
  name: string;
  value: string;
  disable: boolean;
}
