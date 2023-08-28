import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_cart.findMany({});
};

const getManyByCustomer = async (id: number) => {
  return await prisma.oc_cart.findMany({
    where: {
      customer_id: id,
    },
  });
};

const getById = async (id: number) => {
  return await prisma.oc_cart.findFirst({});
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default { getManyByCustomer, getAll, add, update, removeOne, getById };
