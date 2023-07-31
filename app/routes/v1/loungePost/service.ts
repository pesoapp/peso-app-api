import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.lounge_post.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
    orderBy: {
      date_created: "desc",
    },
  });
};

const getById = async (id: number) => {
  return await prisma.lounge_post.findFirst({
    where: {
      post_id: id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
