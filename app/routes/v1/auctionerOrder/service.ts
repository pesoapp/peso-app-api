import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  return await prisma.auctioner_order.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getAllByAuctioner = async (auctioner_id: number) => {
  return await prisma.auctioner_order.findMany({
    where: {
      auctioner_id: auctioner_id,
    },
  });
};

const getById = async (id: number) => {
  return await prisma.auctioner_order.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auctioner_order.create({
    data: {
      auction_order_id: _body.auction_order_id,
      auctioner_id: _body.auctioner_id,
      order_status_id: _body.order_status_id,
      order_number: _body.order_number,
      value: _body.value,
      shipping_method: _body.shipping_method,
    },
  });
};

const updateStatus = async (filter: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE auctioner_order SET order_status_id=31 where order_number=" +
      filter.order_number +
      ""
  );
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getAll,
  getAllByAuctioner,
  add,
  update,
  updateStatus,
  removeOne,
  getById,
};
