import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 5, page = 1 } = _req.query;

  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction Bid failed",
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
      message: "Get Auction Bid success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Auction Bid failed",
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
    message: "Get Auction Bid fail",
  };

  try {
    const data = await service.getById(Number(id));
    response = {
      data: [data],
      status: "success",
      message: "Get Auction Bid success",
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
  const { id = 0 } = _req.params;
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.getByAuction(Number(id));
    const temp =
      (await ocCustomer.getManyByCustomer(
        data.map((e: any) => e.customer_id)
      )) ?? [];

    data.map((e: any) => {
      e.customer = temp.find(
        (customer: any) => (customer.customer_id = e.customer_id)
      );
      return e;
    });

    response = {
      data,
      status: "success",
      message: "Get Auction Bid success",
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

const add = async (_req: Request, _res: Response) => {
  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.add(_req.body);
    response = {
      data: [data],
      status: "success",
      message: "Add Auction Bid success",
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

const approve = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  let response: any = {
    data: [],
    status: "fail",
    message: "Server failure",
  };

  try {
    const data = await service.approve(Number(id));
    response = {
      data: [data],
      status: "success",
      message: "Approve Auction Bid success",
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

const removeOne = async (_req: Request, _res: Response) => {};

export { approve, getByAuction, getAll, getById, add, update, removeOne };
