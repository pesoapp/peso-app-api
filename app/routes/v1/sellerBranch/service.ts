import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.seller_branch.findMany({});
};

const getById = async (id: number) => {
  return await prisma.seller_branch.findFirst({
    where: {
      id,
    },
  });
};

const getManyById = async (ids: number[]) => {
  return await prisma.seller_branch.findMany({
    where: {
      id: { in: ids },
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getManyById, getAll, add, update, removeOne, getById };
