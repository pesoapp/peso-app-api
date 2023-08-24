import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_product_image.findMany({});
};

const getById = async (id: number) => {
  return await prisma.oc_product_image.findFirst({
    where: {
      product_id: id,
    },
  });
};

const getByProduct = async (id: number) => {
  return await prisma.oc_product_image.findMany({
    where: {
      product_id: id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default { getByProduct, getAll, add, update, removeOne, getById };
