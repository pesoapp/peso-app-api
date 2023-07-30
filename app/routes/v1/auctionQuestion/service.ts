import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.auction_question.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  const temp = await prisma.auction_question.findFirst({
    where: {
      id,
    },
  });
  return temp;
};

const getByAuction = async (auction_id: number) => {
  return await prisma.auction_question.findMany({
    where: {
      auction_id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction_question.create({
    data: {
      customer_id: _body.customer_id,
      question: _body.question,
      auction_id: _body.auction_id,
      date_added: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getByAuction, getAll, add, update, removeOne, getById };
