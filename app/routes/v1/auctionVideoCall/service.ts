import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.auction_video_call.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.auction_video_call.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction_video_call.create({
    data: {
      link: _body.link,
      auctioner_id: _body.auctioner_id,
      auction_id: _body.auction_id,
      customer_id: _body.customer_id,
      date_added: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
