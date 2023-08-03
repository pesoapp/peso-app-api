import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  const result = await prisma.$queryRaw`SELECT * FROM lounge_social`;
  return result;
};

const getAllLikesByPost = async (post_id: number = 0) => {
  const result = await prisma.$queryRaw<
    any[]
  >`SELECT * FROM lounge_social WHERE post_id=${post_id}`;
  return result;
};

const getById = async (id: number) => {};

const toggleLike = async (body: any) => {
  const result =
    (await prisma.$queryRaw<
      any[]
    >`SELECT * FROM lounge_social WHERE post_id=${body.post_id}`) ?? [];

  if (result.length == 0) {
    await prisma.$executeRawUnsafe(
      "INSERT INTO lounge_social (`customer_id`, `post_id`, `like`) VALUES (" +
        body.customer_id +
        ", " +
        body.post_id +
        ", 1)"
    );
  } else {
    await prisma.$executeRawUnsafe(
      `DELETE FROM lounge_social WHERE post_id = ${body.post_id} AND customer_id = ${body.customer_id}`
    );
  }

  return result;
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  toggleLike,
  getAllLikesByPost,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
