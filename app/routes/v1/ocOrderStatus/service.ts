import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  return await prisma.auctioner_order_total.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getAllByIds = async (ids: number[]) => {
  return await prisma.oc_order_status.findMany({
    where: {
      order_status_id: { in: ids },
    },
  });
};

const getById = async (id: number) => {
  return await prisma.oc_order_status.findFirst({
    where: {
      order_status_id: id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getAll,
  getAllByIds,
  add,
  update,
  removeOne,
  getById,
};
