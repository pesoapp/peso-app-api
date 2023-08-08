import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_customer.findMany();
};

const getById = async (id: number) => {
  return await prisma.oc_customer.findFirst({
    where: {
      customer_id: id,
    },
  });
};

const getManyByCustomer = async (ids: number[]) => {
  return await prisma.oc_customer.findMany({
    where: {
      customer_id: { in: ids },
    },
  });
};

const toggleActiveStatus = async (customer_id: number, active: boolean) => {
  return await prisma.oc_customer.updateMany({
    where: {
      customer_id,
    },
    data: {
      live_video_status: active,
    },
  });
};

const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default {
  toggleActiveStatus,
  getManyByCustomer,
  getById,
  getAll,
  add,
  update,
  removeOne,
};
