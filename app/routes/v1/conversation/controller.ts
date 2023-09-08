import { PUSHER } from "../../../constants";
import { PUSHER_INSTANCE } from "../../../utils";
import service from "./service";
import { Request, Response } from "express";

const getAllByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getAllByCustomer(Number(id));

  const temp = data.map((e: any) => {
    const { id, ...res } = e;
    return { id: Number(id), ...res };
  });

  _res.send({
    data: temp,
    status: "success",
    message: "Get Conversation success",
  });
};

const getConversation = async (_req: Request, _res: Response) => {
  const { id = 0, customerId = 0 } = _req.params;
  const data = await service.getConversation(Number(customerId), Number(id));
  await service.readMessage(
    "auctioner_message",
    "sender_id",
    "receiver_id",
    Number(id),
    Number(customerId)
  );

  _res.send({
    data,
    status: "success",
    message: "Get Conversation success",
  });
};

const sendMessage = async (_req: Request, _res: Response) => {
  const data = await service.sendMessage({
    status: 0,
    call_id: 0,
    smstype: _req.body.auction_id == 0 ? "MESSAGE" : "WITH_ITEM",
    ..._req.body,
  });

  await PUSHER_INSTANCE.triggerBatch([
    {
      channel: PUSHER.CHANNEL.MESSAGE_CHANNEL,
      name: PUSHER.NAME.MESSAGE,
      data: Number(_req.body.receiver_id),
    },
  ]);

  _res.send({
    data: [data],
    status: "success",
    message: "Get Conversation success",
  });
};

export { getAllByCustomer, getConversation, sendMessage };
