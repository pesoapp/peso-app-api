import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  return await prisma.auction_side_images.findMany({});
};

const getById = async (id: number) => {
  return await prisma.auction_side_images.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getAll, add, update, removeOne, getById };
