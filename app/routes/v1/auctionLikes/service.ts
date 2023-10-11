import { prisma } from "../../../db";

const getByAuction = async (query: any) => {
  return await prisma.auction_likes.findMany({
    where: {
      auction_id: query.auction_id,
    },
  });
};

const getOne = async (query: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM auction_likes where auction_id=" +
      query.auction_id +
      " and customer_id=" +
      query.customer_id +
      ""
  );
};

const add = async (_body: any) => {
  return await prisma.auction_likes.create({
    data: {
      auction_id: _body.auction_id,
      customer_id: _body.customer_id,
      date_added: new Date(),
    },
  });
};

const removeOne = async (id: number) => {
  return await prisma.auction_likes.delete({
    where: {
      id,
    },
  });
};

export default { getByAuction, add, removeOne, getOne };
