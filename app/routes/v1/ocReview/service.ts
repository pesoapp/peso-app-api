import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_review.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.oc_review.findFirst({
    where: {
      review_id: id,
    },
  });
};

const getByProduct = async ({ product_id = 0, limit = 5, page = 1 }) => {
  return await prisma.oc_review.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
    where: {
      product_id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default { getByProduct, getAll, add, update, removeOne, getById };
