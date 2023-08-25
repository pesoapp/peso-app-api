import { prisma } from "../../../db";

const getAll = async () => {
  const result = await prisma.latest_promo.findMany({
    where: {
      status: 1,
      featured_promo: 0,
    },
  });
  return result;
};

const getById = async (id: number) => {
  return await prisma.latest_promo.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
