import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.condition.findMany();
};

const getById = async (id: number) => {
  return await prisma.condition.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.condition.create({
    data: {
      condition: _body.condition,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getById, getAll, add, update, removeOne };
