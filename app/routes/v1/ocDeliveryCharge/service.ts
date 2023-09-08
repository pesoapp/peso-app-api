import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_delivery_charge.findMany();
};
const getManyById = async (ids: number[]) => {
  return await prisma.oc_delivery_charge.findMany({
    where: {
      id: { in: ids },
    },
  });
};

const getById = async (id: number) => {
  return await prisma.oc_delivery_charge.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getManyById, getById, getAll, add, update, removeOne };
