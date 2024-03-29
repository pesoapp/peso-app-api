import service from "./service";
import ocCustomer from "../ocCustomer/service";
import ocAddress from "../ocAddress/service";
import ocCountry from "../ocCountry/service";
import auctionerOrder from "../auctionerOrder/service";
import auctionCart from "../auctionCart/service";
import { Request, Response } from "express";
import { getPaymentMethod, getShippingMethod } from "../../../utils";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction Order failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({
      limit: Number(limit),
      page: Number(page),
    });

    response = {
      data: data,
      status: "success",
      message: "Get Auction Order success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  _res.send(response);
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.getById(Number(id));
    if (!data) {
      throw new Error();
    }

    response = {
      data: [],
      status: "success",
      message: "Get Auction Order success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const { customers } = _req.body;
  const customer = await ocCustomer.getById(Number(_req.body.customer_id));
  const d_address = await ocAddress.getById(Number(_req.body.d_address));
  const d_country = await ocCountry.getById(Number(d_address?.country_id ?? 0));
  const b_address = await ocAddress.getById(Number(_req.body.b_address));
  const b_country = await ocCountry.getById(Number(b_address?.country_id ?? 0));
  const shippingMethod = getShippingMethod(_req.body.shipping_method);
  const paymentMethod = getPaymentMethod(_req.body.payment_method);
  const data = await service.add({
    paymentMethod,
    shippingMethod,
    customer,
    b_address,
    d_address,
    b_country,
    d_country,
    useshipINs: _req.body.useshipINs,
    userAgent: _req.headers["user-agent"],
    ip: _req.headers["host"],
  });

  await Promise.all(
    customers.map(async (cust: any) => {
      const auctionerOrderTemp = await auctionerOrder.add({
        auction_order_id: data.id,
        auctioner_id: cust.auctioner_id,
        shipping_method: shippingMethod.name,
        order_number: `${data.id}-${cust.quantity}`, // TODO: change cust.quantity to order_no
        order_status_id: 0,
        flat_rate: 100, // TODO: Add flat rate
      });
    })
  );

  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Order success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Auction Order success",
  });
};

export { getAll, getById, add, update, removeOne };
