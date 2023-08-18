import { prisma } from "../../../db";

const getAll = async (query: any) => {
  const result = await prisma.lp_seller_promo_list.findMany({});
  return result;
};

const getById = async (id: number) => {
  return await prisma.lp_seller_promo_list.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
