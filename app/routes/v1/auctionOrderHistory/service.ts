import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  return await prisma.auctioner_order.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getAllByAuctionerOrder = async (auctioner_ids: number[]) => {
  return await prisma.auctioner_order_item.findMany({
    where: {
      auctioner_order_id: { in: auctioner_ids },
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

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const updateStatus = async (filter: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE auction_order_history SET order_status_id=31 where order_number=" +
      filter.order_number +
      ""
  );
};

const removeOne = async (id: number) => {};

export default {
  getAll,
  getAllByAuctionerOrder,
  updateStatus,
  add,
  update,
  removeOne,
  getById,
};
