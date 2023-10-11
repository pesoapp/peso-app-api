import service from "./service";
import { Request, Response } from "express";
import ocCustomerWallet from "../ocCustomerWallet/service";

const toggle = async (_req: Request<any, any, any>, _res: Response) => {
  const { customer_id, name } = _req.body;

  let response: any = {
    data: [],
    status: "fail",
    message: "Create Auction Likes failed",
  };

  try {
    const data = await service.getOne(_req.body);
    console.log(data);

    if (data.length !== 0) {
      await service.removeOne(Number(data[0].id));
      await ocCustomerWallet.removeOne({
        customer_id,
        particulars: "Liked the Auction (" + name + ")",
      });
    } else {
      await service.add(_req.body);
      await ocCustomerWallet.add({
        customer_id,
        particulars: "Liked the Auction (" + name + ")",
        amount: 0.5,
      });
    }

    response = {
      data: [!data],
      status: "success",
      message: "Toggel Auction Likes success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: _.toString(),
      message: "Get Auction Likes failed",
    };
  }

  _res.send(response);
};

export { toggle };
