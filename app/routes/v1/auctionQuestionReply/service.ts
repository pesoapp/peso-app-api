import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  return await prisma.auction_question_reply.findMany({});
};

const getById = async (id: number) => {
  return await prisma.auction_question_reply.findFirst({
    where: {
      id,
    },
  });
};

const getByAuctionQuestion = async (question_id: number) => {
  return await prisma.auction_question_reply.findMany({
    where: {
      question_id,
    },
  });
};

const getByAuctionQuestions = async (question_ids: number[]) => {
  return await prisma.auction_question_reply.findMany({
    where: {
      question_id: {
        in: question_ids,
      },
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction_question_reply.create({
    data: {
      question_id: _body.question_id,
      reply: _body.reply,
      customer_id: _body.customer_id,
      date_added: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default {
  getByAuctionQuestions,
  getByAuctionQuestion,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
