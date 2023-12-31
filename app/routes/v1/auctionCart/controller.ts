import service from "./service";
import { Request, Response } from "express";
import auction from "../auction/service";
import ocCustomer from "../ocCustomer/service";
import ocDeliveryCharge from "../ocDeliveryCharge/service";
import ocAddress from "../ocAddress/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction Cart failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({ limit, page });
    response = {
      data: data,
      status: "success",
      message: "Get Auction Cart success",
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
      data: [data],
      status: "success",
      message: "Get Auction Cart success",
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

const getByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.getByCustomer(Number(id));
    const auctionTemp = await auction.getManyById(
      data.map((e: any) => {
        return e.auction_id;
      })
    );

    data.map((e: any) => {
      e.auction = auctionTemp.find((auc: any) => auc.id == e.auction_id);
      return e;
    });

    response = {
      data: data.reverse(),
      status: "success",
      message: "Get Auction Cart success",
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

// TODO
const getAuctionRatesById = async (_req: Request, _res: Response) => {
  const { cart_ids = [], cust_def_add = 1 } = _req.query;
  if (!Array.isArray(cart_ids)) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Auction Cart failed",
    });
    return;
  }
  // const custDefAdd = await ocAddress.getById(cust_def_add);
  const data = await service.getManyById(cart_ids ?? []);
  const ocCustomerTemp = await ocCustomer.getManyByCustomer(
    data.map((e: any) => e.auctioner_id)
  );

  const ocAddressTemp = await ocAddress.getManyByManyCustomer(
    data.map((e: any) => e.auctioner_id)
  );

  const auctionTemp = await auction.getManyById(
    data.map((e: any) => e.auction_id)
  );

  const ocDeliveryChargeTemp = await ocDeliveryCharge.getManyById(
    auctionTemp.map((e: any) => e.delivery_charge_id)
  );

  auctionTemp.map((e: any) => {
    e.deliveryChange = ocDeliveryChargeTemp.find(
      (delivery: any) => delivery.id == e.delivery_charge_id
    );
    return e;
  });

  const ddrRates = await ocDeliveryCharge.getDRRate();

  data.map((e: any) => {
    e.auction = auctionTemp.find((auction: any) => auction.id == e.auction_id);
    e.auctioner = ocCustomerTemp.find(
      (customer: any) => customer.customer_id == e.auctioner_id
    );

    return e;
  });

  _res.send({
    data: data,
    status: "success",
    message: "Get Auction Order success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  //TODO: Update only if auction cart already exissts

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const customerCart = await service.checkIfCartExist(_req.body);
    console.log(customerCart);
    if (customerCart.length != 0) {
      const maxTemp = await service.getMaxQuantityByAuctionId(
        _req.body.auction_id
      );
      const max = maxTemp[0].quantity ?? 1;
      await service.updateCartExist({ max, ..._req.body });
      response = {
        data: [],
        status: "success",
        message: "Update Auction Cart success",
      };
    } else {
      const data = await service.add({ ..._req.body });
      response = {
        data: [],
        status: "success",
        message: "Add Auction Cart success",
      };
    }
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const update = async (_req: Request, _res: Response) => {};

const updateQuantity = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.updateQuantity(Number(id), _req.body);

    response = {
      data: [data],
      status: "success",
      message: "Add Auction Cart success",
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
const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Auction Cart success",
  });
};

export {
  getAuctionRatesById,
  updateQuantity,
  getByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
};
