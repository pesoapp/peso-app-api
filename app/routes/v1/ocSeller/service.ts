import { prisma } from "../../../db";

const getAll = async (query: any) => {
  const result = await prisma.oc_seller.findMany({});
  return result;
};

const getById = async (id: number) => {};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
