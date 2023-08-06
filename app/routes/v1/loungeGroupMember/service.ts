import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.lounge_group_member.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.lounge_group_member.findFirst({
    where: {
      id,
    },
  });
};

const getByLoungeGroup = async (lounge_group_id: number) => {
  return await prisma.lounge_group_member.findMany({
    where: {
      lounge_group_id,
    },
  });
};

const getByCustomer = async (customer_id: number) => {
  return await prisma.lounge_group_member.findMany({
    where: {
      customer_id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.lounge_group_member.create({
    data: {
      lounge_group_id: _body.lounge_group_id,
      customer_id: _body.customer_id,
      date_added: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getByCustomer,
  getByLoungeGroup,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
