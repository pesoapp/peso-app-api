import service from "./service";
import { Request, Response } from "express";
import loungeGroupMember from "../loungeGroupMember/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });

  await Promise.all(
    data.map(async (e: any) => {
      e.members = await loungeGroupMember.getByLoungeGroup(e.id);
      return e;
    })
  );

  _res.send({
    data,
    status: "success",
    message: "Get Lounge Group success",
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
      message: "Get Lounge Group failed",
    });
    return;
  }

  _res.send({
    data: [
      { ...data, members: await loungeGroupMember.getByLoungeGroup(data.id) },
    ],
    status: "success",
    message: "Get Lounge Group success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Lounge Group success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Group success",
  });
};

export { getAll, getById, add, update, removeOne };
