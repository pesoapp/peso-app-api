import { PUSHER } from "../../../constants";
import { PUSHER_INSTANCE } from "../../../utils";
import service from "./service";
import { Request, Response } from "express";
import conversation from "../conversation/service";
import ocCustomer from "../ocCustomer/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction Video Call success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Auction Video Call failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Auction Video Call success",
  });
};

// TODO: return link if video call already exists
const add = async (_req: Request<any, any, any>, _res: Response) => {
  const data = await service.add(_req.body);

  const ocCustomerTemp = await ocCustomer.getById(
    Number(_req.body.customer_id)
  );

  await PUSHER_INSTANCE.triggerBatch([
    {
      channel: PUSHER.CHANNEL.AUCTION_VIDEO_CALL,
      name: PUSHER.NAME.VIDEO_COUNT,
      data: {
        customerName: `${ocCustomerTemp?.firstname} ${ocCustomerTemp?.lastname}`,
        customerId: _req.body.auctioner_id,
        status: 0,
      },
    },
    {
      channel: PUSHER.CHANNEL.AUCTION_VIDEO_CALL,
      name: PUSHER.NAME.VIDEO_NOTIFICATION,
      data: {
        customerName: `${ocCustomerTemp?.firstname} ${ocCustomerTemp?.lastname}`,
        customerId: _req.body.auctioner_id,
        status: 0,
      },
    },
    {
      channel: PUSHER.CHANNEL.AUCTION_VIDEO_CALL,
      name: PUSHER.NAME.ID,
      data: data.id,
    },
    {
      channel: PUSHER.CHANNEL.MESSAGE_CHANNEL,
      name: PUSHER.NAME.MESSAGE,
      data: _req.body.auctioner_id,
    },
  ]);

  await conversation.sendMessage({
    customer_id: _req.body.customer_id,
    receiver_id: _req.body.auctioner_id,
    message: "Ongoing Video Call",
    auction_id: _req.body.auction_id,
    smstype: "CALL",
    status: 0,
    call_id: data.id,
  });

  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction Video Call success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Auction Video Call success",
  });
};

export { getAll, getById, add, update, removeOne };
