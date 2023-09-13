import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";
import loungeGroup from "../loungeGroup/service";
import loungeSocial from "../loungeSocial/service";
import loungePostComments from "../loungePostComments/service";
import {
  parseLoungePostTitle,
  shuffle,
  tiktokParser,
  youtubeParser,
} from "../../../utils";

const getAll = async (_req: Request, _res: Response) => {
  const {
    limit = 10,
    page = 1,
    lounge_group_id = 0,
    customer_id = 0,
    search = "",
  } = _req.query;
  const data = await service.getAll({ limit, page, lounge_group_id, search });

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
      e.likes = (await loungeSocial.getAllLikesByPost(e.post_id)).length;
      return e;
    })
  );

  await Promise.all(
    data.map(async (e: any) => {
      e.liked = (await loungeSocial.getAllLikesByPost(e.post_id)).some(
        (e: any) => e.customer_id == customer_id
      );
      return e;
    })
  );

  await Promise.all(
    data.map(async (e: any) => {
      e.comments = (await loungePostComments.getByPost(e.post_id)).length;
      return e;
    })
  );

  const sharesTemp = await service.getManyParentIds(
    [...new Set(data.map((e: any) => e.post_id))].filter((e: number) => e != 0)
  );

  const parentTemp = await service.getManyIds(
    [...new Set(data.map((e: any) => e.post_parent_id))].filter(
      (e: number) => e != 0
    )
  );

  data.map((e: any) => {
    e.title = parseLoungePostTitle(e.title);
    e.parent =
      parentTemp.find(
        (parent: any) => parent.post_id ?? 0 == e.post_parent_id
      ) ?? null;
    e.shares = sharesTemp.filter(
      (share: any) => share.post_parent_id == e.post_id
    ).length;
    return e;
  });

  _res.send({
    data: shuffle(data),
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
  const { customer_id = 0 } = _req.query;
  const data = await service.getById(Number(id));
  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Lounge Post failed",
    });
    return;
  }
  const ocCustomersTemp =
    (await ocCustomer.getManyByCustomer([data?.customer_id ?? 0])) ?? [];

  const loungeGroupTemp =
    (await loungeGroup.getManyByLoungeGroup([data?.lounge_group_id ?? 0])) ??
    [];

  const loungeSocialTemp =
    (await loungeSocial.getAllLikesByPost(data?.post_id ?? 0)) ?? [];
  const loungePostCommentsTemp =
    (await loungePostComments.getByPost(data?.post_id ?? 0)) ?? [];

  _res.send({
    data: [
      {
        ...data,
        title: parseLoungePostTitle(data.title),
        customer: ocCustomersTemp[0] ?? null,
        group: loungeGroupTemp[0] ?? null,
        likes: loungeSocialTemp,
        liked: loungeSocialTemp.some((e: any) => e.customer_id == customer_id),
        comments: loungePostCommentsTemp,
      },
    ],
    status: "success",
    message: "Get Lounge Post success",
  });
};

//TODO: Add incentives
const add = async (_req: Request<any, any, any>, _res: Response) => {
  let file_name: string = _req.body.link;

  if (_req.body.file_type == "youtube") {
    file_name = youtubeParser(_req.body.link);
  }

  if (_req.body.file_type == "tiktok") {
    file_name = tiktokParser(_req.body.link);
  }

  const data = await service.add({
    customer_id: _req.body.customer_id,
    lounge_group_id: _req.body.lounge_group_id ?? 0,
    tags: `${_req.body.tags.replace("#", ",")}`,
    file_type: _req.body.file_type,
    title: `"${_req.body.title} \n#${_req.body.tags.replace(",", " #")}"`,
    file_name,
  });

  _res.send({
    data: [data],
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
