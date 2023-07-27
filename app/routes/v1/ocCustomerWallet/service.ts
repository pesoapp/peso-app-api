import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_customer_wallet.findMany();
};

const getById = async (id: number) => {
  return await prisma.oc_customer_wallet.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.oc_customer_wallet.create({
    data: {
      customer_id: _body.customer_id,
      particulars: _body.particulars,
      amount: _body.amount,
      date_added: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getById, getAll, add, update, removeOne };
