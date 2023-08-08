import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_message_inbox_ca.findMany();
};

const getById = async (id: number) => {
  return await prisma.oc_message_inbox_ca.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getById, getAll, add, update, removeOne };
