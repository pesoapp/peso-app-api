import service from "./service";
import ocSeller from "../ocSeller/service";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({});

  _res.send({
    data,
    status: "success",
    message: "Get Oc Cart success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getManyByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getManyByCustomer(Number(id));
  const ocSellerTemp = await ocSeller.getManyBySeller(
    data.map((e: any) => e.seller_id)
  );

  data.map((e: any) => {
    e.seller = ocSellerTemp.find(
      (seller: any) => seller.seller_id == e.seller_id
    );
    return e;
  });
  _res.send({
    data,
    status: "success",
    message: "Get Oc Cart success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Oc Cart failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Cart success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Cart success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Cart success",
  });
};

export { getManyByCustomer, getAll, getById, add, update, removeOne };
