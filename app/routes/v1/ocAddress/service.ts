import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_address.findMany();
};

const getById = async (id: number) => {
  return await prisma.oc_address.findFirst({
    where: {
      address_id: id,
    },
  });
};
const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getById, getAll, add, update, removeOne };
