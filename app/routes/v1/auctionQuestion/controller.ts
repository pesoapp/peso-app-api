import service from "./service";
import { Request, Response } from "express";
import ocCustomerWallet from "../ocCustomerWallet/service";
import ocCustomer from "../ocCustomer/service";
import auctionQuestionReply from "../auctionQuestionReply/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;

  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction Question failed",
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
      message: "Get Auction Question success",
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
    let data: any = await service.getById(Number(id));

    if (!data) {
      _res.send({
        data: [],
        status: "fail",
        message: "Get Auction Question failed",
      });
      return;
    }
    let auctionQuestionReplyTemp =
      (await auctionQuestionReply.getByAuctionQuestion(Number(id))) ?? [];

    const ocCustomerTemp =
      (await ocCustomer.getManyByCustomer([
        ...new Set([
          ...auctionQuestionReplyTemp.map((e: any) => e.customer_id),
          data.customer_id,
        ]),
      ])) ?? [];

    auctionQuestionReplyTemp.map((e: any) => {
      e.customer = ocCustomerTemp.find(
        (customer: any) => (customer.customer_id = e.customer_id)
      );
      return e;
    });

    data.replies = auctionQuestionReplyTemp;
    data.customer = ocCustomerTemp.find(
      (customer: any) => (customer.customer_id = data.customer_id)
    );

    response = {
      data: [data],
      status: "success",
      message: "Get Auction Question success",
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

const getByAuction = async (_req: Request, _res: Response) => {
  const { id = 5 } = _req.params;
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    let data = await service.getByAuction(Number(id));
    const ocCustomersTemp =
      (await ocCustomer.getManyByCustomer(
        data.map((e: any) => e.customer_id)
      )) ?? [];

    data = data.map((e: any) => {
      e.customer = ocCustomersTemp.find(
        (customer: any) => (customer.customer_id = e.customer_id)
      );
      return e;
    });

    const auctionQuestionReplyTemp =
      await auctionQuestionReply.getByAuctionQuestions([
        ...new Set(data.map((e: any) => e.id)),
      ]);

    data = data.map((e: any) => {
      e.replies = auctionQuestionReplyTemp.filter(
        (reply: any) => (reply.question_id = e.id)
      );
      return e;
    });

    response = {
      data: data,
      status: "success",
      message: "Get Auction Question success",
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
  const { auction_id, customer_id } = _req.body;

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const questions = await service.getByAuction(Number(auction_id));

    await ocCustomerWallet.add({
      customer_id,
      particulars: "Ask the Auction",
      amount: questions.length == 0 ? 2 : 0.1,
    });

    const data = await service.add(_req.body);

    response = {
      data: [data],
      status: "success",
      message: "Add Auction Question success",
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

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Auction Question success",
  });
};

export { getByAuction, getAll, getById, add, update, removeOne };
