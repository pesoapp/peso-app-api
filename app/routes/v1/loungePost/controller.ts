import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";
import loungeGroup from "../loungeGroup/service";
import loungeSocial from "../loungeSocial/service";
import loungePostComments from "../loungePostComments/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });

  const ocCustomersTemp =
    (await ocCustomer.getManyByCustomer(data.map((e: any) => e.customer_id))) ??
    [];

  data.map((e: any) => {
    e.customer = ocCustomersTemp.find(
      (customer: any) => (customer.customer_id = e.customer_id)
    );
    return e;
  });

  const loungeGroupsTemp =
    (await loungeGroup.getManyByLoungeGroup(
      data.map((e: any) => e.lounge_group_id)
    )) ?? [];

  data.map((e: any) => {
    e.lounge_group = loungeGroupsTemp.find(
      (loungeGroup: any) => (loungeGroup.id = e.lounge_group_id)
    );
    return e;
  });

  await Promise.all(
    data.map(async (e: any) => {
      e.likes = await loungeSocial.getAllLikesByPost(e.post_id);
      return e;
    })
  );

  await Promise.all(
    data.map(async (e: any) => {
      e.comments = await loungePostComments.getByPost(e.post_id);
      return e;
    })
  );

  _res.send({
    data,
    status: "success",
    message: "Get Lounge Post success",
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
      message: "Get Lounge Post failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Lounge Post success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Lounge Post success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Post success",
  });
};

export { getAll, getById, add, update, removeOne };
