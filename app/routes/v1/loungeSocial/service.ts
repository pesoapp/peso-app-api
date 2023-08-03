import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  const result = await prisma.$queryRaw`SELECT * FROM lounge_social`;
  return result;
};

const getAllLikesByPost = async (post_id: number = 0) => {
  const result =
    await prisma.$queryRaw`SELECT * FROM lounge_social WHERE post_id=${post_id}`;
  return result;
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

export default { getAllLikesByPost, getAll, add, update, removeOne, getById };
