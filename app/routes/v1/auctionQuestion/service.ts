import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  return await prisma.auction_question.findMany({});
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

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getByAuction, getAll, add, update, removeOne, getById };
