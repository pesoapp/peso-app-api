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

const getCheckoutDetails = async (
  _req: Request<any, any, any>,
  _res: Response
) => {
  const { shipping_address, auction_cart_ids } = _req.query;

  if (!Array.isArray(auction_cart_ids)) {
    _res.send({
      data: [],
      status: "failed",
      message: "auction_cart_ids is not an array",
    });
  }
  let totalFlatRate = 0;
  const cartItems = await service.getManyById(auction_cart_ids as any[]);
  const auctionItems = await auction.getManyById([
    ...new Set(cartItems.map((cart: any) => cart.auction_id)),
  ]);
  const deliveryCharges = await ocDeliveryCharge.getManyById([
    ...new Set(auctionItems.map((auction: any) => auction.delivery_charge_id)),
  ]);

  const shippingAddress = await ocAddress.getById(Number(shipping_address));
  const auctionerAddresses = await ocAddress.getManyByManyCustomer([
    ...new Set(cartItems.map((cart: any) => cart.auctioner_id)),
  ]);
  console.log(auctionerAddresses);

  const DRRate = await ocDeliveryCharge.getManyById([5, 1, 2, 3]);

  const temp = cartItems.map((cart: any) => {
    cart.auction = auctionItems.find(
      (auction: any) => auction.id == cart.auction_id
    );
    cart.deliveryCharge = deliveryCharges.find(
      (deliveryCharge: any) =>
        deliveryCharge.id == cart.auction.delivery_charge_id
    );
    let flatrateDiffPRV = 0;
    let flatrateSamePRV = 0;

    if (cart.deliveryCharge.id == 5) {
      if (cart.quantity < 5) {
        const rate = DRRate.find((rate: any) => rate.id == 5);
        flatrateDiffPRV = Number(rate?.amount ?? 0);
        flatrateSamePRV = Number(rate?.provincial_amount ?? 0);
      } else if (cart.quantity < 9) {
        const rate = DRRate.find((rate: any) => rate.id == 1);
        flatrateDiffPRV = Number(rate?.amount ?? 0);
        flatrateSamePRV = Number(rate?.provincial_amount ?? 0);
      } else if (cart.quantity < 17) {
        const rate = DRRate.find((rate: any) => rate.id == 2);
        flatrateDiffPRV = Number(rate?.amount ?? 0);
        flatrateSamePRV = Number(rate?.provincial_amount ?? 0);
      } else {
        const rate = DRRate.find((rate: any) => rate.id == 3);
        flatrateDiffPRV = Number(rate?.amount ?? 0);
        flatrateSamePRV = Number(rate?.provincial_amount ?? 0);
      }
    } else if (cart.deliveryCharge.id == 1) {
      flatrateSamePRV = cart.deliveryCharge.amount * cart.quantity;
      flatrateDiffPRV = cart.deliveryCharge.provincial_amount * cart.quantity;
    } else if (cart.deliveryCharge.id == 2) {
      flatrateSamePRV = cart.deliveryCharge.amount * cart.quantity;
      flatrateDiffPRV = cart.deliveryCharge.provincial_amount * cart.quantity;
    } else {
      flatrateSamePRV = cart.deliveryCharge.amount * cart.quantity;
      flatrateDiffPRV = cart.deliveryCharge.provincial_amount * cart.quantity;
    }

    const auctioner = auctionerAddresses.find(
      (auctioner_address: any) =>
        auctioner_address.customer_id == cart.auctioner_id
    );

    cart.flat_rate =
      shippingAddress?.region == auctioner?.region
        ? flatrateSamePRV
        : flatrateDiffPRV;
    totalFlatRate +=
      shippingAddress?.region == auctioner?.region
        ? flatrateSamePRV
        : flatrateDiffPRV;
    cart.sub_total = cart.quantity * cart.price;
    cart.total_price = cart.quantity * cart.price;
    cart.insurance_fee =
      cart.quantity * cart.price > 500 ? cart.quantity * cart.price * 0.01 : 0;
    cart.credit_card = (
      (cart.quantity * cart.price) / 0.972 -
      cart.quantity * cart.price
    ).toFixed(2);
    cart.maxx_payment = Math.round(cart.quantity * cart.price * 0.015).toFixed(
      2
    );
    return cart;
  });

  let currentOrderNumber = 0;
  const ocCustomerTemp = await ocCustomer.getManyByCustomer([
    ...new Set(temp.map((items: any) => items.auctioner_id)),
  ]);
  const details = ocCustomerTemp.map((customer: any, index: number) => {
    const auctions = temp
      .filter((e: any) => e.auctioner_id == customer.customer_id)
      .map((auctionTemp: any) => {
        currentOrderNumber++;
        auctionTemp.order_no = currentOrderNumber;
        return auctionTemp;
      });

    const totalPerstore = auctions.reduce(
      (acc, curr) => acc + curr.total_price,
      0
    );
    const insuranceFee = totalPerstore > 500 ? totalPerstore * 0.01 : 0;

    return {
      auctioner_id: customer.customer_id,
      auctioner: customer,
      auctions,
      order_no: index + 1,
      delstats: "Yes",
      pickupstats: "Yes",
      totalPerstore,
      insuranceFee,
      flatRate: totalFlatRate,
    };
  });

  _res.send({
    data: details,
    status: "success",
    message: "Get cart checkout details success",
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
  getCheckoutDetails,
};
