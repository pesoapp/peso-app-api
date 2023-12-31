import { prisma } from "../../../db";

const getOne = async (post_id: number, customer_id: number) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM lounge_post_views where post_id=" +
      post_id +
      " and customer_id=" +
      customer_id +
      ";"
  );
};

const update = async (post_id: number, customer_id: number) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE lounge_post_views SET total_view=total_view+1 WHERE post_id = " +
      post_id +
      " AND customer_id=" +
      customer_id +
      ";"
  );
};

const add = async (post_id: number, customer_id: number) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "INSERT INTO lounge_post_views(`post_id`,`customer_id`,`total_view`) values (" +
      post_id +
      "," +
      customer_id +
      ",1);"
  );
};

const getManyByPost = async (id: number) => {
  return await prisma.lounge_post_views.findMany({
    where: {
      post_id: id,
    },
  });
};

const getManyByPosts = async (ids: number[]) => {
  return await prisma.lounge_post_views.findMany({
    where: {
      post_id: {
        in: ids,
      },
    },
  });
};

export default {
  getOne,
  getManyByPost,
  update,
  add,
  getManyByPosts,
};
