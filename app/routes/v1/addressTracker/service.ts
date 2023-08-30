import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit, page, province, city } = _query;

  if (province != "") {
    return await prisma.address_tracker.groupBy({
      where: { province },
      by: ["city"],
      orderBy: {
        city: "asc",
      },
    });
  }

  if (city != "") {
    return await prisma.address_tracker.findMany({
      where: { city },
    });
  }

  return await prisma.address_tracker.groupBy({
    by: ["province"],
    orderBy: {
      province: "asc",
    },
  });
};

const getById = async (id: number) => {};

const getManyById = async (ids: number[]) => {};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getManyById,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
