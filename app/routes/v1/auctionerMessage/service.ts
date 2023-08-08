import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.auctioner_message.findMany();
};

const getById = async (id: number) => {
  return await prisma.auctioner_message.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getById, getAll, add, update, removeOne };
