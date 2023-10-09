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

const getManyById = async (ids: any[]) => {
  return await prisma.auction_cart.findMany({
    where: {
      id: { in: ids.map((e: any) => Number(e)) },
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

const getByAuctionPriceCustomer = async (
  auction_id: number,
  customer_id: number,
  price: number
) => {
  return await prisma.auction_cart.findFirst({
    where: {
      customer_id,
      auction_id,
      price,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction_cart.create({
    data: {
      auction_id: _body.auction_id,
      auctioner_id: _body.auctioner_id,
      price: _body.price,
      customer_id: _body.customer_id,
      date_added: new Date(),
      quantity: 1,
      // @ts-ignore
      due: Date.parse(_body.due),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const updateQuantity = async (id: any, _body: any) => {
  return await prisma.auction_cart.update({
    where: {
      id,
    },
    data: {
      quantity: _body.quantity,
    },
  });
};

const removeOne = async (id: number) => {};

export default {
  getManyById,
  updateQuantity,
  getByAuctionPriceCustomer,
  getByCustomer,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
