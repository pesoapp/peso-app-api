import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.bg_product.findMany({
    where: {
      status: 1,
    },
  });
};

const getManyByProduct = async (product_id: number) => {
  return await prisma.bg_product.findMany({
    where: {
      status: 1,
      product_id,
    },
  });
};

const getManyByProducts = async (ids: number[]) => {
  return await prisma.bg_product.findMany({
    where: {
      status: 1,
      product_id: { in: ids },
    },
  });
};

const getById = async (id: number) => {
  return await prisma.bg_product.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default {
  getManyByProduct,
  getManyByProducts,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
