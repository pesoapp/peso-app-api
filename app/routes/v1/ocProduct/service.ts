import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_product.findMany({});
};

// FIX: Taking to long to respond
const getById = async (id: number) => {
  return await prisma.oc_product.findFirst({
    where: {
      product_id: id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
