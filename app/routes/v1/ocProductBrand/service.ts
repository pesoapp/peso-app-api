import { prisma } from "../../../db";

const getAll = async (query: any) => {
  return await prisma.oc_product_brand.findMany({});
};

const getById = async (id: number) => {
  return await prisma.oc_product_brand.findFirst({
    where: {
      id,
    },
  });
};

const getManyById = async (ids: number[]) => {
  return await prisma.oc_product_brand.findMany({
    where: {
      id: { in: ids },
    },
  });
};

const add = async (_body: any) => {
  return await prisma.oc_product_brand.create({
    data: {
      name: _body.name,
      description: _body.description,
      status: 1,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getManyById, getById, getAll, add, update, removeOne };
