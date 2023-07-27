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

const add = async (_body: any) => {
  return await prisma.auction_side_images.create({
    data: {
      auction_id: _body.auction_id,
      image_path: _body.image_path,
      sort_order: _body.sort_order,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getAll, add, update, removeOne, getById };
