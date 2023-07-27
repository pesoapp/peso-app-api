import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_delivery_charge.findMany();
};

const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getAll, add, update, removeOne };
