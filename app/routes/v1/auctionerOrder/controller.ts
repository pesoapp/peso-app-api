import service from "./service";
import auctionOrder from "../auctionOrder/service";
import auctionerOrderTotal from "../auctionerOrderTotal/service";
import ocOrderStatus from "../ocOrderStatus/service";
import auctionerOrderItem from "../auctionerOrderItem/service";
import auction from "../auction/service";
import auctionOrderHistory from "../auctionOrderHistory/service";
import ocOrder from "../ocOrder/service";
import ocStatusPerStore from "../ocStatusPerStore/service";
import ocCustomerWallet from "../ocCustomerWallet/service";

import { Request, Response } from "express";

import { getPaymentMethod, getShippingMethod } from "../../../utils";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auctioner Order failed",
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
      message: "Get Auctioner Order success",
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

const getAllByAuctioner = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auctioner Order failed",
  };

  try {
    const data = await service.getAllByAuctioner(Number(id ?? 0));
    const auctionOrderTemp = await auctionOrder.getAllByIds([
      ...new Set(data.map((e: any) => e.auction_order_id)),
    ]);

    const auctionerOrderTotalTemp =
      await auctionerOrderTotal.getAllByAuctionerOrderId([
        ...new Set(data.map((e: any) => e.id)),
      ]);

    const ocOrderStatusTemp = await ocOrderStatus.getAllByIds([
      ...new Set(data.map((e: any) => e.order_status_id)),
    ]);

    const auctionerOrderItemTemp =
      await auctionerOrderItem.getAllByAuctionerOrder([
        ...new Set(data.map((e: any) => e.id)),
      ]);

    const auctionTemp = await auction.getManyById([
      ...new Set(auctionerOrderItemTemp.map((e: any) => e.auction_id)),
    ]);

    auctionerOrderItemTemp.map((auctionOrderItem: any) => {
      auctionOrderItem.auction = auctionTemp.find(
        (e: any) => e.id == auctionOrderItem.auction_id
      );
      return auctionOrderItem;
    });
    const temp = data.map((auctionerOrder: any) => {
      auctionerOrder.auctionOrder = auctionOrderTemp.find(
        (e: any) => e.id == auctionerOrder.auction_order_id
      );

      auctionerOrder.auctionerOrderTotal = auctionerOrderTotalTemp.find(
        (e: any) => e.auctioner_order_id == auctionerOrder.id
      );

      auctionerOrder.ocOrderStatus = ocOrderStatusTemp.find(
        (e: any) => e.order_status_id == auctionerOrder.order_status_id
      );

      auctionerOrder.auctionerOrderItems = auctionerOrderItemTemp.filter(
        (e: any) => e.auctioner_order_id == auctionerOrder.id
      );
      return auctionerOrder;
    });

    response = {
      data: temp,
      status: "success",
      message: "Get Auctioner Order success",
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
      message: "Get Auctioner Order success",
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
  const data = await service.add(_req.body);
  _res.send({
    data: [data],
    status: "success",
    message: "Add Auctioner Order success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Auctioner Order success",
  });
};

const cancel = async (_req: Request<any, any, any>, _res: Response) => {
  const { auction_order_id } = _req.body;
  await auctionOrderHistory.updateStatus({ order_number: auction_order_id });
  await auctionOrder.updateStatus({ order_number: auction_order_id });
  await service.updateStatus({ order_number: auction_order_id });
  await ocOrder.updateStatus({ order_id: auction_order_id });
  await ocStatusPerStore.updateStatus({ order_id: auction_order_id });
  await ocCustomerWallet.updateStatus({ order_id: auction_order_id });
  const walletInfo = await ocCustomerWallet.getWalletInfo(auction_order_id);

  await Promise.all(
    walletInfo.map(async (e: any) => {
      await ocCustomerWallet.cancelOrder({
        customer_id: e.customer_id,
        amount: e.amount,
        particulars:
          "Reversal For cancelled (Order Id:" + auction_order_id + ")",
      });
      return e;
    })
  );

  _res.send({
    data: [],
    status: "success",
    message: "Cancel Auctioner Order success",
  });
};

export { getAll, getAllByAuctioner, cancel, getById, add, update, removeOne };
