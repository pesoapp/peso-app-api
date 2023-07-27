import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  return await prisma.auction.findMany({
    include: {
      condition: true,
    },
  });
};

const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getAll, add, update, removeOne };
