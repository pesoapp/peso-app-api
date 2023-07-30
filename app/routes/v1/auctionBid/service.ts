import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  return await prisma.auction_bid.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.auction_bid.findFirst({
    where: {
      id,
    },
  });
};

const getByAuction = async (auction_id: number) => {
  return await prisma.auction_bid.findMany({
    where: {
      auction_id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction_bid.create({
    data: {
      customer_id: _body.customer_id,
      auction_id: _body.auction_id,
      bid: _body.bid,
      created_at: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default {
  getByAuction,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
