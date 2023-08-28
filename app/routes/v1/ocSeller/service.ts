import { prisma } from "../../../db";

const getAll = async (query: any) => {
  return await prisma.oc_seller.findMany({});
};

const getManyBySeller = async (ids: number[]) => {
  return await prisma.oc_seller.findMany({
    where: {
      seller_id: { in: ids },
    },
  });
};

const getById = async (id: number) => {};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getManyBySeller, getAll, add, update, removeOne, getById };
