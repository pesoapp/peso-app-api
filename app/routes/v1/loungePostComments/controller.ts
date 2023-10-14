import service from "./service";
import ocCustomer from "../ocCustomer/service";
import loungeCommentSocial from "../loungeCommentSocial/service";
import { Request, Response } from "express";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Lounge Post Comments failed",
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
      message: "Get Lounge Post Comments success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Lounge Post Comments failed",
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
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Lounge Post Comments failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Lounge Post Comments success",
  });
};

const getByPost = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const { comment_parent_id = 0, customer_id = 0 } = _req.query;
  const data = await service.getByPost(Number(id), Number(comment_parent_id));

  const ocCustomerTemp = await ocCustomer.getManyByCustomer([
    ...new Set<number>(data.map((e: any) => e.customer_id)),
  ]);

  data.map((e: any) => {
    e.customer = ocCustomerTemp.find(
      (customer: any) => customer.customer_id == e.customer_id
    );

    return e;
  });

  const loungeCommentSocialTemp = await loungeCommentSocial.getManyByIds(
    [...new Set<number>(data.map((e: any) => e.customer_id))],
    [...new Set<number>(data.map((e: any) => e.comment_id))]
  );

  data.map((e: any) => {
    e.customer = ocCustomerTemp.find(
      (customer: any) => customer.customer_id == e.customer_id
    );
    e.likes = loungeCommentSocialTemp.filter(
      (comment: any) => comment.comment_id == e.comment_id
    ).length;
    e.liked = loungeCommentSocialTemp.some(
      (comment: any) => comment.comment_id == e.comment_id
    );

    e.replies = loungeCommentSocialTemp.filter(
      (comment: any) => comment.comment_parent_id == e.comment_id
    ).length;
    return e;
  });

  _res.send({
    data,
    status: "success",
    message: "Get Lounge Post Comments success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const data = await service.add(_req.body);

  _res.send({
    data: [data],
    status: "success",
    message: "Add Lounge Post Comments success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Remove Lounge Post Comments success",
  });
};

export { getByPost, getAll, getById, add, update, removeOne };
