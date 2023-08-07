import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.auction_cart.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.auction_cart.findFirst({
    where: {
      id,
    },
  });
};

const getByCustomer = async (customer_id: number) => {
  return await prisma.auction_cart.findMany({
    where: {
      customer_id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getByCustomer, getAll, add, update, removeOne, getById };
