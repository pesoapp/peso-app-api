import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_manufacturer.findMany({});
};

const getById = async (id: number) => {};

const getByProduct = async (id: number) => {};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default { getByProduct, getAll, add, update, removeOne, getById };
