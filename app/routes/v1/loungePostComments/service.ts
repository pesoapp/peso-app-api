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

const getByPost = async (id: number) => {
  return await prisma.lounge_post_comments.findMany({
    where: {
      post_id: id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getByPost, getAll, add, update, removeOne, getById };
