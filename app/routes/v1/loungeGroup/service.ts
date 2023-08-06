import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.lounge_group.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.lounge_group.findFirst({
    where: {
      id,
    },
  });
};

const getManyByLoungeGroup = async (ids: number[]) => {
  return await prisma.lounge_group.findMany({
    where: {
      id: { in: ids },
    },
  });
};

const add = async (_body: any) => {
  return await prisma.lounge_group.create({
    data: {
      name: _body.name,
      customer_id: _body.customer_id,
      date_added: new Date(),
      picture: _body.picture,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getManyByLoungeGroup,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
