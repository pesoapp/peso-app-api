import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";
import loungeGroup from "../loungeGroup/service";
import loungeSocial from "../loungeSocial/service";
import loungePostComments from "../loungePostComments/service";
import loungeCommentSocial from "../loungeCommentSocial/service";
import loungePostViews from "../loungePostViews/service";
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

  const parentPostCustomerTemp = await ocCustomer.getManyByCustomer([
    ...new Set(data.map((e: any) => e.customer_id)),
  ]);

  parentTemp.map((e: any) => {
    e.customer = parentPostCustomerTemp.find(
      (customer: any) => customer.customer_id == e.customer_id
    );
    e.title = parseLoungePostTitle(e.title);
    return e;
  });

  const loungePostViewsTemp = await loungePostViews.getManyByPosts([
    ...new Set(data.map((e: any) => e.post_id)),
  ]);

  data.map((e: any) => {
    e.title = parseLoungePostTitle(e.title);
    e.parent =
      parentTemp.find(
        (parent: any) => parent.post_id ?? 0 == e.post_parent_id
      ) ?? null;

    e.shares = sharesTemp.filter(
      (share: any) => share.post_parent_id == e.post_id
    ).length;

    e.views = loungePostViewsTemp
      .filter((view: any) => view.post_id == e.post_id)
      .reduce((acc: any, curr: any) => curr.total_view + acc, 0);
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

  const loungeGroupTemp =
    (await loungeGroup.getManyByLoungeGroup([data?.lounge_group_id ?? 0])) ??
    [];

  const loungeSocialTemp =
    (await loungeSocial.getAllLikesByPost(data?.post_id ?? 0)) ?? [];
  const loungePostCommentsTemp =
    (await loungePostComments.getByPost(data?.post_id ?? 0)) ?? [];

  const ocCustomersTemp =
    (await ocCustomer.getManyByCustomer([
      data?.customer_id ?? 0,
      ...loungePostCommentsTemp.map((e: any) => e.customer_id),
    ])) ?? [];

  const replies =
    (await loungePostComments.getManyByParents(
      loungePostCommentsTemp.map((e: any) => e.comment_id)
    )) ?? [];

  const loungeCommentSocialTemp = await loungeCommentSocial.getManyByIds(
    loungePostCommentsTemp.map((e: any) => e.customer_id),
    loungePostCommentsTemp.map((e: any) => e.comment_id)
  );

  loungePostCommentsTemp.map((e: any) => {
    e.customer = ocCustomersTemp.find(
      (customer: any) => customer.customer_id == e.customer_id
    );

    e.replies = replies.filter(
      (reply: any) => reply.comment_parent_id == e.comment_id
    ).length;

    e.likes = loungeCommentSocialTemp.filter(
      (like: any) => like.comment_id == e.comment_id
    ).length;

    e.liked = loungeCommentSocialTemp.some(
      (like: any) =>
        like.comment_id == e.comment_id && like.customer_id == customer_id
    );
    return;
  });

  const sharesTemp = await service.getManyParentIds(
    [data?.post_id ?? 0].filter((e: number) => e != 0)
  );
  await loungePostViews.add(data?.post_id ?? 0, Number(customer_id ?? 0));

  const loungePostViewsTemp = (
    await loungePostViews.getManyByPost(data?.post_id ?? 0)
  ).reduce((acc: any, curr: any) => curr.total_view + acc, 0);

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
        shares: sharesTemp.length,
        views: loungePostViewsTemp,
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
    post_parent_id: _req.body.post_parent_id,
    customer_id: _req.body.customer_id,
    lounge_group_id: _req.body.lounge_group_id ?? 0,
    tags: `${_req.body.tags.replace("#", ",")}`,
    file_type: _req.body.file_type,
    title: `"${_req.body.title} #${_req.body.tags.replace(",", " #")}"`,
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
