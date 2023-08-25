import { prisma } from "../../../db";

const getAll = async (query: any) => {
  const result = await prisma.oc_banner_image_description.findMany({});
  return result;
};

const getById = async (id: number) => {};

const getByBanner = async (banner_id: number) => {
  return await prisma.oc_banner_image_description.findMany({
    where: {
      banner_id,
    },
  });
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getByBanner, getAll, add, update, removeOne, getById };
