import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.lounge_post_comments.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.lounge_post_comments.findFirst({
    where: {
      comment_id: id,
    },
  });
};

const getByPost = async (id: number, parent: number = 0) => {
  return await prisma.lounge_post_comments.findMany({
    where: {
      post_id: id,
      comment_parent_id: parent,
    },
  });
};

const getManyByParents = async (ids: number[]) => {
  return await prisma.lounge_post_comments.findMany({
    where: {
      comment_parent_id: { in: ids },
    },
  });
};

const add = async (_body: any) => {
  return await prisma.lounge_post_comments.create({
    data: {
      post_id: _body.post_id,
      customer_id: _body.customer_id,
      comment: `\"${_body.comment}\"`,
      comment_parent_id: _body.comment_parent_id ?? 0,
      date_created: new Date(),
      date_modified: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getManyByParents,
  getByPost,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
